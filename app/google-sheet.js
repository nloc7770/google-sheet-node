const { google } = require("googleapis");

/**
 * Writes data to our Google sheet
 */
const writeData = async (res) => {

  const auth = new google.auth.GoogleAuth({
    keyFile: "token.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  //Auth client Object
  const authClientObject = await auth.getClient();

  //Google sheets instance
  const googleSheetsInstance = google.sheets({
    version: "v4",
    auth: authClientObject,
  });

  // spreadsheet id
  const spreadsheetId = process.env.SPREADSHEETID;
  //write data into the google sheets
  googleSheetsInstance.spreadsheets.values.append(
    {
      auth, //auth object
      spreadsheetId, //spreadsheet id
      range: process.env.SHEETNAME,
      valueInputOption: "RAW", // The information will be passed according to what the usere passes in as date, number or text
      resource: {
        values: [["a", "b", "c"]],
      },
    },
    (err, result) => {
      if (err) {
        // Handle error
        console.log(`update failed: ${err.message}`);
      } else {
        console.log(` cells updated on:${result.data.updates.updatedRange}`);
      }
    }
  );
};

module.exports = { writeData };
