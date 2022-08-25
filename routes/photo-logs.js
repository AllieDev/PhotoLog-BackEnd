const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");



router.get("/", (req, res) => {
  const rawData = fs.readFileSync("./data/data.json");
  const data = JSON.parse(rawData);
  res.json(data);
});

router.get("/:id", (req, res) => {
  const rawData = fs.readFileSync("./data/data.json");
  const data = JSON.parse(rawData);
  
  const photoLogData = data.photoLogsData.find((photoLog) => {
    return photoLog.id == req.params.id;
  });
  res.json(photoLogData);
});

router.post("/", (req, res) => {
  addUserPostToPhotoLogsData(req.body);
  res.end();
});

router.put("/:id", (req, res) => {
  updateUserPostFromPhotoLogsData(req.params.id, req.body);
  res.end();
});

router.delete("/:id", (req, res) => {
  console.log("DELETE request to /reminders with id of " + req.params.id);
  deleteUserPostFromPhotoLogsData(req.params.id);
  res.end();
});

// add user post to data.json file -------------------------------
async function addUserPostToPhotoLogsData(userPost) {
  const rawData = fs.readFileSync("./data/data.json");
  const data = JSON.parse(rawData);

  userPost.id = uuidv4();
  data.photoLogsData.push(userPost);

  const newJson = JSON.stringify(data);
  fs.writeFileSync("./data/data.json", newJson);
}
// ----------------------------------------------------------------

// delete user post from data.json file -------------------------------
async function deleteUserPostFromPhotoLogsData(paramId) {
  const rawData = fs.readFileSync("./data/data.json");
  const data = JSON.parse(rawData);

  const photoLogIndex = data.photoLogsData.findIndex((photoLog) => {
    return photoLog.id == paramId;
  });

  data.photoLogsData.splice(photoLogIndex, 1);

  const newJson = JSON.stringify(data);
  fs.writeFileSync("./data/data.json", newJson);
}
// ----------------------------------------------------------------

// update user post from data.json file -------------------------------
async function updateUserPostFromPhotoLogsData(paramId, userPost) {
  const rawData = fs.readFileSync("./data/data.json");
  const data = JSON.parse(rawData);

  const photoLogIndex = data.photoLogsData.findIndex((photoLog) => {
    return photoLog.id == paramId;
  });

  userPost.id = uuidv4();
  data.photoLogsData.splice(photoLogIndex, 1, userPost);

  const newJson = JSON.stringify(data);
  fs.writeFileSync("./data/data.json", newJson);
}
// ----------------------------------------------------------------

module.exports = router;
