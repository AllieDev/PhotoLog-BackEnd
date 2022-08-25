const port = 3000;
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const photoLogs = require("./routes/photo-logs.js");
app.use("/photo-logs", photoLogs);

app.listen(3000, () => {
  console.log("listening on port http://localhost:3000");
});
