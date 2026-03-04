import type { APIRoute } from 'astro';

// Zoom webinar IDs (from the existing registration links)
const WEBINAR_IDS = {
  tuesday: 'NVnbVFRtS-a2-VI0mNqe-A',    // Tuesday 12pm CT
  wednesday: 'P22EHu65RqKsbHBUKMGfog'   // Wednesday 7pm CT
};

// Get Zoom access token using Server-to-Server OAuth
async function getZoomAccessToken(): Promise<string> {
  const accountId = import.meta.env.ZOOM_ACCOUNT_ID;
  const clientId = import.meta.env.ZOOM_CLIENT_ID;
  const clientSecret = import.meta.env.ZOOM_CLIENT_SECRET;
  
  if (!accountId || !clientId || !clientSecret) {
    throw new Error('Zoom credentials not configured');
  }
  
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  const response = await fetch('https://zoom.us/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=account_credentials&account_id=${accountId}`
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get Zoom token: ${error}`);
  }
  
  const data = await response.json();
  return data.access_token;
}

// Register user for Zoom webinar
async function registerForWebinar(
  webinarId: string,
  email: string,
  firstName: string,
  lastName: string
): Promise<{ join_url: string; registrant_id: string }> {
  const accessToken = await getZoomAccessToken();
  
  const response = await fetch(`https://api.zoom.us/v2/webinars/${webinarId}/registrants`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      first_name: firstName,
      last_name: lastName || firstName // Use first name if no last name
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to register for webinar: ${error}`);
  }
  
  return response.json();
}

// Add lead to Notion database
async function addLeadToNotion(data: {
  email: string;
  firstName: string;
  lastName?: string;
  timeSlot: string;
  source: string;
  joinUrl: string;
}): Promise<void> {
  const notionToken = import.meta.env.NOTION_TOKEN;
  const databaseId = import.meta.env.NOTION_LEADS_DATABASE_ID;
  
  if (!notionToken || !databaseId) {
    console.warn('Notion not configured, skipping lead capture');
    return;
  }
  
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        'Name': {
          title: [{ text: { content: `${data.firstName} ${data.lastName || ''}`.trim() } }]
        },
        'Email': {
          email: data.email
        },
        'Source': {
          select: { name: data.source }
        },
        'Time Slot': {
          select: { name: data.timeSlot }
        },
        'Status': {
          select: { name: 'Registered' }
        },
        'Join URL': {
          url: data.joinUrl
        },
        'Created': {
          date: { start: new Date().toISOString() }
        }
      }
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to add lead to Notion:', error);
    // Don't throw - lead capture failure shouldn't break registration
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    const email = formData.get('email')?.toString();
    const firstName = formData.get('first_name')?.toString();
    const lastName = formData.get('last_name')?.toString();
    const timeSlot = formData.get('time_slot')?.toString() as 'tuesday' | 'wednesday';
    
    // Validation
    if (!email || !firstName || !timeSlot) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: email, first_name, time_slot'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const webinarId = WEBINAR_IDS[timeSlot];
    if (!webinarId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid time slot'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Register with Zoom
    const registration = await registerForWebinar(webinarId, email, firstName, lastName || '');
    
    // Capture lead in Notion (async, don't wait)
    addLeadToNotion({
      email,
      firstName,
      lastName,
      timeSlot,
      source: 'Webinar Registration',
      joinUrl: registration.join_url
    }).catch(err => console.error('Notion lead capture failed:', err));
    
    return new Response(JSON.stringify({
      success: true,
      joinUrl: registration.join_url,
      message: `You're registered! Check your email for the Zoom link.`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Webinar registration error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Disable prerendering for this API route
export const prerender = false;
