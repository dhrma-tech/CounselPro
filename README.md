# CounselPro

Expert college admission counselling service for Indian students navigating JoSAA and MHT CET systems.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Form Connection**: Google Apps Script (Self-Healing) + Google Sheets

## Local Development

1. **Clone & Install**:
   ```bash
   git clone <repository-url>
   cd CounselPro-5
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file:
   ```bash
   SHEET_URL=your_google_apps_script_url
   ```

3. **Run**:
   ```bash
   npm run dev
   ```

## Deploy on Vercel

1. **Push code** to your GitHub repository.
2. **Import Project** on Vercel dashboard.
3. **Add Environment Variable**:
   - Key: `SHEET_URL`
   - Value: `https://script.google.com/macros/s/.../exec`
4. **Deploy**: Vercel will build and launch the site.
5. **Custom Domain**: Connect your domain in Vercel settings and redeploy.

## Google Apps Script Setup (Self-Healing)

1. Create a new [Google Apps Script](https://script.google.com/) project.
2. Paste the following code which automatically manages columns and handles multiple pipelines:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); 

  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = (data.formType === "application") ? data.counsellingType : "Contact";
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) { sheet = ss.insertSheet(sheetName); }

    var HEADERS_APP = [
      "submittedAt", "submissionId", "counsellingType", "name", "email", "phone", 
      "whatsappNumber", "city", "state", "gender", "category", "domicileState", 
      "seatType", "mahSeatType", "isPwd", "isDefence", "isOMS", "isTFWS", 
      "isMinority", "minorityDetails", "airRank", "categoryRank", "percentile", 
      "marks", "mhtcetPercentile", "mhtcetAllStateMeritRank", "mhtcetCategoryRank",
      "preferredBranches", "instituteTypes", "quotas", "feeBudget", "specificColleges", "consent"
    ];

    var HEADERS_CONTACT = ["submittedAt", "submissionId", "name", "email", "phone", "subject", "message"];

    var masterHeaders = (data.formType === "application") ? HEADERS_APP : HEADERS_CONTACT;
    var existingHeaders = sheet.getLastColumn() > 0 ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];

    masterHeaders.forEach(function(header) {
      if (existingHeaders.indexOf(header) === -1) {
        sheet.getRange(1, sheet.getLastColumn() + 1).setValue(header).setFontWeight("bold").setBackground("#f3f3f3");
        existingHeaders.push(header);
      }
    });

    var row = existingHeaders.map(function(header) {
      var value = data[header];
      if (value === undefined || value === null) {
        if (data.examDetails && data.examDetails[header] !== undefined) { value = data.examDetails[header]; }
      }
      if (header === "name" && !value) { value = data.candidateName || data.name; }
      if (Array.isArray(value)) return value.join(", ");
      return (value !== undefined && value !== null) ? value : "";
    });

    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message })).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}
```

3. **Deploy** as Web App -> Execute as **Me** -> Access **Anyone**.

## License
MIT
