const express = require("express");
const router = express.Router();
 
const {
  getNotifications,
  markAsRead,
  getUnreadCount
} = require("../../controllers/dashboard/notificationController");
 
const { verifyToken } = require("../../middleware/authMiddleware");
 
// Get all notifications
router.get("/", verifyToken, getNotifications);
 
// Mark notification as read
router.put("/:id/read", verifyToken, markAsRead);
 
// Get unread count
router.get("/unread/count", verifyToken, getUnreadCount);
 
module.exports = router;
 