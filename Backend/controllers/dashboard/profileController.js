const db = require("../../config/db");
 
// ===============================
// GET PROFILE
// ===============================
exports.getProfile = async (req, res) => {
  try {
    const [users] = await db.execute(
      `SELECT
          u.id,
          u.email,
          u.phone,
          u.plan_id,
          p.full_name,
          p.profile_image,
          p.role,
          pl.name AS plan_name,
          pl.price AS plan_price,
          pl.duration
       FROM users u
       LEFT JOIN profile p ON u.id = p.user_id
       LEFT JOIN plans pl ON u.plan_id = pl.id
       WHERE u.id = ?`,
      [req.user.id]
    );
 
    if (!users[0]) {
      return res.status(404).json({ message: "User not found" });
    }
 
    res.json(users[0]);
 
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
 
// ===============================
// UPDATE PROFILE
// ===============================
exports.updateProfile = async (req, res) => {
  try {
    const { full_name, profile_image, role } = req.body;
 
    if (!full_name) {
      return res.status(400).json({ message: "Full name is required" });
    }
 
    await db.execute(
      `UPDATE profile
       SET full_name = ?, profile_image = ?, role = ?
       WHERE user_id = ?`,
      [
        full_name,
        profile_image || null,
        role || null,
        req.user.id
      ]
    );
 
    res.json({ message: "Profile updated successfully" });
 
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
 