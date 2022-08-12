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
  let values = [
    ["Chris", "Male", "1. Freshman", "FL", "Art", "Baseball"],
    ["Chris", "Male", "1. Freshman", "FL", "Art", "Baseball"],
    ["Chris", "Male", "1. Freshman", "FL", "Art", "Baseball"],
    ["Chris", "Male", "1. Freshman", "FL", "Art", "Baseball"],
    ["Chris", "Male", "1. Freshman", "FL", "Art", "Baseball"],
    ["Chris", "Male", "1. Freshman", "FL", "Art", "Baseball"],
    ["Chris", "Male", "1. Freshman", "FL", "Art", "Baseball"],
    // Potential next row
  ];
  const resource = {
    values,
  };
  //write data into the google sheets
  googleSheetsInstance.spreadsheets.values.append(
    {
      auth, //auth object
      spreadsheetId, //spreadsheet id
      range: process.env.SHEETNAME,
      valueInputOption: "RAW", // The information will be passed according to what the usere passes in as date, number or text
      resource: resource,
    },
    (err, result) => {
      if (err) {
        // Handle error
          res
            .status(200)
            .json(`update failed: ${err.message}`);
      } else {
        return res
          .status(200)
          .json(` cells updated on:${result.data.updates.updatedRange}`);
      }
    }
  );
};

module.exports = { writeData };
