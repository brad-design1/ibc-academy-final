import type { APIRoute } from 'astro';

// Generic lead capture endpoint for free-guide and discovery forms
// Captures to Notion and optionally triggers Kit automation

interface LeadData {
  email: string;
  firstName: string;
  lastName?: string;
  source: 'free-guide' | 'discovery' | 'webinar' | 'other';
  // Discovery-specific fields
  ibcFamiliarity?: string;
  interestTrigger?: string;
  monthlyCapacity?: string;
  timeline?: string;
  questions?: string;
  phone?: string;
}

// Add lead to Notion database
async function addLeadToNotion(data: LeadData): Promise<{ success: boolean; pageId?: string }> {
  const notionToken = import.meta.env.NOTION_TOKEN;
  const databaseId = import.meta.env.NOTION_LEADS_DATABASE_ID;
  
  if (!notionToken || !databaseId) {
    console.warn('Notion not configured');
    return { success: false };
  }
  
  // Build properties based on source
  const properties: Record<string, any> = {
    'Name': {
      title: [{ text: { content: `${data.firstName} ${data.lastName || ''}`.trim() } }]
    },
    'Email': {
      email: data.email
    },
    'Source': {
      select: { name: data.source === 'free-guide' ? 'Free Guide' : data.source === 'discovery' ? 'Discovery Request' : data.source }
    },
    'Status': {
      select: { name: data.source === 'discovery' ? 'Discovery Requested' : 'Lead' }
    },
    'Created': {
      date: { start: new Date().toISOString() }
    }
  };
  
  // Add discovery-specific fields if present
  if (data.phone) {
    properties['Phone'] = { phone_number: data.phone };
  }
  
  if (data.ibcFamiliarity) {
    properties['IBC Familiarity'] = { select: { name: data.ibcFamiliarity } };
  }
  
  if (data.interestTrigger) {
    properties['Interest Trigger'] = { select: { name: data.interestTrigger } };
  }
  
  if (data.monthlyCapacity) {
    properties['Monthly Capacity'] = { select: { name: data.monthlyCapacity } };
  }
  
  if (data.timeline) {
    properties['Timeline'] = { select: { name: data.timeline } };
  }
  
  if (data.questions) {
    properties['Notes'] = { rich_text: [{ text: { content: data.questions.slice(0, 2000) } }] };
  }
  
  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Notion API error:', error);
      return { success: false };
    }
    
    const result = await response.json();
    return { success: true, pageId: result.id };
  } catch (err) {
    console.error('Notion capture error:', err);
    return { success: false };
  }
}

// Tag subscriber in Kit (ConvertKit)
async function tagInKit(email: string, tagName: string): Promise<void> {
  const kitApiKey = import.meta.env.KIT_API_KEY;
  const kitApiSecret = import.meta.env.KIT_API_SECRET;
  
  if (!kitApiKey) {
    console.warn('Kit not configured');
    return;
  }
  
  // Kit API requires looking up tag ID first, then tagging subscriber
  // For now, we'll use the form subscription endpoint if we have a form ID
  const formIds: Record<string, string> = {
    'free-guide': import.meta.env.KIT_FORM_FREE_GUIDE || '',
    'discovery': import.meta.env.KIT_FORM_DISCOVERY || '',
    'webinar': import.meta.env.KIT_FORM_WEBINAR || ''
  };
  
  const formId = formIds[tagName];
  if (!formId) {
    console.warn(`No Kit form configured for ${tagName}`);
    return;
  }
  
  try {
    const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: kitApiKey,
        email
      })
    });
    
    if (!response.ok) {
      console.error('Kit subscription failed:', await response.text());
    }
  } catch (err) {
    console.error('Kit error:', err);
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data: LeadData;
    
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      data = {
        email: formData.get('email')?.toString() || '',
        firstName: formData.get('first_name')?.toString() || '',
        lastName: formData.get('last_name')?.toString(),
        source: (formData.get('source')?.toString() || 'other') as LeadData['source'],
        ibcFamiliarity: formData.get('ibc_familiarity')?.toString(),
        interestTrigger: formData.get('interest_trigger')?.toString(),
        monthlyCapacity: formData.get('monthly_capacity')?.toString(),
        timeline: formData.get('timeline')?.toString(),
        questions: formData.get('questions')?.toString(),
        phone: formData.get('phone')?.toString()
      };
    }
    
    // Validation
    if (!data.email || !data.firstName) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: email, firstName'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Capture in Notion
    const notionResult = await addLeadToNotion(data);
    
    // Tag in Kit (async, don't wait)
    tagInKit(data.email, data.source).catch(err => 
      console.error('Kit tagging failed:', err)
    );
    
    // Return appropriate response based on source
    const responses: Record<string, { message: string; redirect?: string }> = {
      'free-guide': {
        message: 'Check your inbox for the guide!',
        redirect: '/free-guide/thank-you'
      },
      'discovery': {
        message: 'Thanks! Now pick a time for your call.',
        redirect: '/discovery/thank-you'
      }
    };
    
    const response = responses[data.source] || { message: 'Thanks for your submission!' };
    
    return new Response(JSON.stringify({
      success: true,
      ...response,
      notionCaptured: notionResult.success
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Lead capture error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Capture failed'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const prerender = false;
