export async function postToGoogleSheets(url: string, data: any) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Google Apps Script preference
      },
      body: JSON.stringify(data),
    });

    // Google Apps Script usually returns a redirect or a simple JSON
    // We handle text response first because sometimes it's not pure JSON
    const text = await response.text();
    
    // Check if it's HTML (Google Login page or Error page)
    if (text.trim().startsWith('<!DOCTYPE html>') || text.trim().startsWith('<html')) {
      console.error('Received HTML instead of JSON from Google Sheets API.');
      console.error('Response snippet:', text.substring(0, 500));
      return { 
        success: false, 
        message: 'API configuration error: Received HTML response. Please ensure your Google Script is deployed as a Web App with "Anyone" access.' 
      };
    }
    
    try {
      const json = JSON.parse(text);
      return { 
        success: json.success || response.ok, 
        data: json,
        message: json.message || (response.ok ? 'Success' : 'API Error')
      };
    } catch (e) {
      // If it's not JSON, it might still be a success message or an HTML error
      if (response.ok) {
        return { success: true, message: 'Success (non-JSON response)' };
      }
      throw new Error(`Invalid response from API: ${text.substring(0, 100)}`);
    }
  } catch (error: any) {
    console.error('Google Sheets POST Error:', error);
    throw error;
  }
}
