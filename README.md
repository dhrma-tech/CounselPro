# CounselPro

Expert college admission counselling service for Indian students navigating JoSAA and MHT CET systems.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Backend Connection**: Google Apps Script (Web App) for form data collection to Google Sheets.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd counselpro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.local.example` to `.env.local` and add your Google Apps Script URL.
   ```bash
   cp .env.local.example .env.local
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Google Apps Script Setup
Create a new Google Apps Script project and paste the following code to receive form submissions:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Applications')
  const data = JSON.parse(e.postData.contents)
  
  // Create spreadsheet columns in this order:
  // Timestamp, Type, Name, Phone, Email, City, State, Exam JSON, Branches, College Types, Fee Budget, Specific Colleges, Consent
  
  sheet.appendRow([
    data.submittedAt,
    data.counsellingType,
    data.name,
    data.phone,
    data.email,
    data.city,
    data.state,
    JSON.stringify(data.examDetails),
    data.branches,
    data.collegeTypes,
    data.feeBudget,
    data.specificColleges,
    data.consent
  ])
  
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON)
}
```

Deploy as a Web App with access for "Anyone".

## License
MIT
