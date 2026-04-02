const functions = require("firebase-functions");
const { google } = require("googleapis");

const serviceAccount = require("./service-account.json");

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

exports.syncToGoogleSheets = functions.firestore
  .document("waitlist/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const sheets = google.sheets({ version: "v4", auth });

    const row = [
      new Date().toISOString(),
      data.fullName || "",
      data.email || "",
      data.whatsapp || "",
      data.dateOfBirth || "",
      data.location || "",
      data.educationalStatus || "",
      data.howHeard || "",
    ];

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A:H",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [row],
        },
      });
      console.log("✅ Successfully synced:", data.email);
    } catch (error) {
      console.error("❌ Error syncing to sheet:", error);
    }
  });