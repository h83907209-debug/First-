const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/query", (req, res) => {

  const { phone } = req.body;

  res.json({
    data: {
      phone,
      fullName: "Cyber User",
      address: "Unknown Location"
    }
  });

});

app.listen(3001, () => {
  console.log("SERVER RUNNING");
});
