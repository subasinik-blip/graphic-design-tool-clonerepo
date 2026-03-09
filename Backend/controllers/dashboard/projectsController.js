const db = require("../../config/db");
 
// ===============================
// CREATE PROJECT
// ===============================
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
 
    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }
 
    const [result] = await db.execute(
      "INSERT INTO projects (user_id, title, description) VALUES (?, ?, ?)",
      [userId, title, description || null]
    );
 
    res.status(201).json({
      message: "Project created",
      projectId: result.insertId,
    });
 
  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
 
 
// ===============================
// GET USER PROJECTS
// ===============================
exports.getUserProjects = async (req, res) => {
  try {
    const userId = req.user.id;
 
    const [projects] = await db.execute(
      "SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
 
    res.json(projects);
 
  } catch (err) {
    console.error("Fetch projects error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
 
 
// ===============================
// DELETE PROJECT
// ===============================
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;
 
    await db.execute(
      "DELETE FROM projects WHERE id = ? AND user_id = ?",
      [projectId, userId]
    );
 
    res.json({ message: "Project deleted" });
 
  } catch (err) {
    console.error("Delete project error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
 