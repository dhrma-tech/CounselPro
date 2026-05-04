// Using built-in fetch from Node.js 20+

const SHEET_URL = "https://script.google.com/macros/s/AKfycbw47T2jo4rZVFDFYY_EAOcJ4uU7U2A0zjyPbyikyh4tuGV1iTLjezYPpMQSosgaDls5Ug/exec";

async function testSubmission() {
  console.log('--- Testing Google Sheets Integration ---');
  console.log('Target URL:', SHEET_URL);

  const testData = {
    formType: 'test-diagnostic',
    name: 'Antigravity Diagnostic Test',
    email: 'diagnostic@counselpro.ai',
    phone: '0000000000',
    submittedAt: new Date().toISOString(),
    notes: 'This is an automated diagnostic test to verify the Google Sheets workflow.'
  };

  try {
    const response = await fetch(SHEET_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(testData),
    });

    console.log('Response Status:', response.status);
    console.log('Response OK:', response.ok);

    const text = await response.text();
    console.log('Response Body:', text);

    if (text.trim().startsWith('<!DOCTYPE html>') || text.trim().startsWith('<html')) {
      console.error('\n[ISSUE DETECTED] Received HTML response.');
      console.error('This usually happens if:');
      console.ol('1. The script is not deployed as a Web App.');
      console.ol('2. The "Who has access" setting is not set to "Anyone".');
      console.ol('3. The URL is incorrect or the script has been deleted.');
    } else {
      try {
        const json = JSON.parse(text);
        if (json.success || json.result === 'success') {
          console.log('\n[SUCCESS] Google Sheets integration is working perfectly!');
        } else {
          console.warn('\n[WARNING] Script returned a failure message:', json);
        }
      } catch (e) {
        console.log('\n[SUCCESS?] Received non-JSON response, but if the status is 200, it might have worked.');
      }
    }
  } catch (error) {
    console.error('\n[CRITICAL ERROR] Failed to connect to Google Sheets:', error.message);
  }
}

testSubmission();
