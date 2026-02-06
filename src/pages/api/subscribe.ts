import type { APIRoute } from 'astro';

// This endpoint runs on the server (not pre-rendered)
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // ConvertKit V4 API
    const apiKey = import.meta.env.CONVERTKIT_API_KEY;
    
    if (!apiKey) {
      console.error('CONVERTKIT_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch('https://api.convertkit.com/v4/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        email_address: email
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('ConvertKit error:', data);
      return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Redirect back to homepage with success message
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/?subscribed=true'
      }
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
