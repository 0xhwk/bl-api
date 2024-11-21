const fs = require("fs").promises;
const path = require("path");

// JSON file path
const jsonFilePath = path.join(
  __dirname,
  "../../Storage/sanctionedAddresses.json"
);

const isAddressSanctioned = async (address) => {
  try {
    // Read the file asynchronously
    const data = await fs.readFile(jsonFilePath, "utf8");

    // Parse the JSON data
    const addresses = JSON.parse(data);

    // Check if the address exists in the list
    return addresses.includes(address);
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

module.exports = { isAddressSanctioned };
