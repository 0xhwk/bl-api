const fs = require("fs").promises;
const path = require("path");

// JSON file path
const jsonFilePath = path.join(
  __dirname,
  "../../Storage/sanctionedAddresses.json"
);

const addSanctionedAddress = async (address) => {
  try {
    // Read the file asynchronously
    const data = await fs.readFile(jsonFilePath, "utf8");

    // Parse the JSON data
    const addresses = JSON.parse(data);

    // Check if the address already exists
    if (addresses.includes(address)) {
      return "Address already exists in the list.";
    }

    // Add the new address
    addresses.push(address);

    // Write the updated JSON back to the file
    await fs.writeFile(jsonFilePath, JSON.stringify(addresses, null, 2));

    return `Address added successfully! : ${address}`;
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

module.exports = { addSanctionedAddress };
