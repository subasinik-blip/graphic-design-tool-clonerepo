const db = require("../../config/db");
 
// ===============================
// CREATE NOTIFICATION (Internal)
// ===============================
exports.createNotification = async (
  user_id,
  type,
  reference_id,
  message
) => {
  try {
    const sql = `
      INSERT INTO notifications (user_id, type, reference_id, message)
      VALUES (?, ?, ?, ?)
    `;
 
    await db.execute(sql, [
      user_id,
      type,
      reference_id,
      message,
    ]);
 
  } catch (error) {
    console.error("Notification Error:", error);
  }
};
 
 
// ===============================
// GET ALL NOTIFICATIONS
// ===============================
exports.getNotifications = async (req, res, next) => {
  try {
    const user_id = req.user.id;
 
    const sql = `
      SELECT * FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
 
    const [rows] = await db.execute(sql, [user_id]);
 
    return res.status(200).json({
      success: true,
      data: rows,
    });
 
  } catch (error) {
    next(error);
  }
};
 
 
// ===============================
// MARK SINGLE NOTIFICATION AS READ
// ===============================
exports.markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
 
    const sql = `
      UPDATE notifications
      SET is_read = 1
      WHERE id = ? AND user_id = ?
    `;
 
    const [result] = await db.execute(sql, [id, user_id]);
 
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }
 
    return res.status(200).json({
      success: true,
      message: "Marked as read",
    });
 
  } catch (error) {
    next(error);
  }
};
 
 
// ===============================
// MARK ALL AS READ
// ===============================
exports.markAllAsRead = async (req, res, next) => {
  try {
    const user_id = req.user.id;
 
    const sql = `
      UPDATE notifications
      SET is_read = 1
      WHERE user_id = ? AND is_read = 0
    `;
 
    await db.execute(sql, [user_id]);
 
    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
 
  } catch (error) {
    next(error);
  }
};
 
 
// ===============================
// UNREAD COUNT
// ===============================
exports.getUnreadCount = async (req, res, next) => {
  try {
    const user_id = req.user.id;
 
    const sql = `
      SELECT COUNT(*) as unreadCount
      FROM notifications
      WHERE user_id = ? AND is_read = 0
    `;
 
    const [rows] = await db.execute(sql, [user_id]);
 
    return res.status(200).json({
      success: true,
      unreadCount: rows[0].unreadCount,
    });
 
  } catch (error) {
    next(error);
  }
};
 