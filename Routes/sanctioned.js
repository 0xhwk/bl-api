const express = require("express");
const router = express.Router();
const {
  getSanctionedAddresses,
} = require("../Methods/SanctionedAddresses/getSanctionedAddresses.js");
const {
  addSanctionedAddress,
} = require("../Methods/SanctionedAddresses/addSanctionedAddress.js");
const {
  removeSanctionedAddress,
} = require("../Methods/SanctionedAddresses/removeSanctionedAddress");
const {
  isAddressSanctioned,
} = require("../Methods/SanctionedAddresses/isAddressSanctioned");

router.get("/getSanctionedAddresses", async (req, res) => {
  try {
    const addresses = await getSanctionedAddresses();
    res.json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error: Cannot Get Sanctioned Addresses",
    });
  }
});

router.post("/addSanctionedAddress", async (req, res) => {
  const { address } = req.body;

  // Validate that the address is provided
  if (!address) {
    return res.status(400).json({
      success: false,
      message: "Address is required.",
    });
  }

  try {
    // Call the addSanctionedAddress function
    const result = await addSanctionedAddress(address);

    // Send success response
    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    // Handle any errors and return a 500 response
    console.error("Error adding sanctioned address:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/removeSanctionedAddress", async (req, res) => {
  const { address } = req.body;

  // Validate input
  if (!address) {
    return res.status(400).json({
      success: false,
      message: "Address is required.",
    });
  }

  try {
    const result = await removeSanctionedAddress(address);
    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    console.error("Error removing sanctioned address:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/isAddressSanctioned", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({
      success: false,
      message: "Address is required.",
    });
  }

  try {
    const isSanctioned = await isAddressSanctioned(address);
    res.status(200).json({
      success: true,
      isSanctioned,
    });
  } catch (error) {
    console.error("Error checking address:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
