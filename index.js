const express = require("express");
const app = express();

const sanctionedAddresses = require("./Routes/sanctioned.js");
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.use("/sanctioned", sanctionedAddresses);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
