/**
 * Submit form data to Google Sheets using Google Apps Script Web App
 *
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste the following code:
 *
 * function doPost(e) {
 *   try {
 *     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     const data = JSON.parse(e.postData.contents);
 *
 *     // Add timestamp
 *     const row = [new Date().toISOString()];
 *
 *     // Add all form fields
 *     Object.values(data).forEach(value => {
 *       row.push(value || '');
 *     });
 *
 *     sheet.appendRow(row);
 *
 *     return ContentService.createTextOutput(JSON.stringify({
 *       status: 'success',
 *       message: 'Data saved successfully'
 *     })).setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({
 *       status: 'error',
 *       message: error.toString()
 *     })).setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 *
 * 4. Deploy as Web App (anyone can access)
 * 5. Copy the deployment URL and add to Sanity homePageSettings
 */

export async function submitToGoogleSheets(
  url: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  if (!url) {
    return { success: false, error: "Google Sheets URL not configured" };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // Increase timeout for Google Apps Script
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API responded with status ${response.status}`);
    }

    const result = await response.json();

    if (result.status === "error") {
      throw new Error(result.message || "Unknown error from Google Sheets");
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit to Google Sheets",
    };
  }
}
