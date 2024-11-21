const fs = require("fs").promises;
const path = require("path");

// Path to the JSON file
const jsonFilePath = path.join(
  __dirname,
  "../../Storage/sanctionedAddresses.json"
);

const getSanctionedAddresses = async () => {
  try {
    const data = await fs.readFile(jsonFilePath, "utf8");

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("File not found. Make sure the JSON file exists.");
    }
    if (error.name === "SyntaxError") {
      throw new Error(
        "Error parsing JSON data. Ensure the file contains valid JSON."
      );
    }
    throw new Error(`Unexpected error: ${error.message}`);
  }
};

module.exports = {
  getSanctionedAddresses,
};
// /Storage/sanctionedAddresses.json
