const express = require("express");
const router = express.Router({ mergeParams: true});

const { createMessage, getMessage, deleteMessage } = require("../handlers/messages");

// prefix - /api/users/:id/messages in index.js
router.route("/").post(createMessage);

router.route(":/message_id").get(getMessage).delete(this.deleteMessage);

module.exports = router;