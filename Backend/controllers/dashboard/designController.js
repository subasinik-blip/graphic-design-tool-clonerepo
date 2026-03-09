const db = require("../../config/db");
 
// ===============================
// CREATE DESIGN
// ===============================
exports.createDesign = async (req, res) => {
  try {
    const { name, template_id, width, height } = req.body;
    const user_id = req.user.id;
 
    if (!name) {
  const error = new Error("Project name is required");
  error.statusCode = 400;
  throw error;
}
 
    if (!template_id && (!width || !height)) {
      return res.status(400).json({
          success: false,
        message: "Either template_id OR width and height are required",
      });
    }
   
    const sql = `
      INSERT INTO designs (user_id, name, template_id, width, height)
      VALUES (?, ?, ?, ?, ?)
    `;
 
    const [result] = await db.execute(sql, [
      user_id,
      name,
      template_id || null,
      width || null,
      height || null,
    ]);
 
    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      projectId: result.insertId,
    });
 
  } catch (error) {
    console.error(error);
    // DB duplicate name error handle
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Design name already exists",
      });
    }
    return next(error); // existing errorHandler
  }
};
 
 
// ===============================
// GET ALL DESIGNS (Logged User)
// ===============================
exports.getDesigns = async (req, res) => {
  try {
    const user_id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search ? `%${req.query.search}%` : '%';
 
    const offset = (page - 1) * limit;
 
    const sql = `
  SELECT * FROM designs
  WHERE user_id = ?
  AND is_deleted = 0
  AND name LIKE ?
  ORDER BY created_at DESC
   LIMIT ${limit} OFFSET ${offset}
`;
 
    const [rows] = await db.execute(sql, [user_id,search]);
     
    return res.status(200).json({
      success: true,
      message: "Designs fetched successfully",
       page,
      limit,
      data: rows
    });
 
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error" });
  }
};
 
 
// ===============================
// GET SINGLE DESIGN
// ===============================
exports.getSingleDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id; // 🔐 ownership check
 
    const sql = `
      SELECT * FROM designs
      WHERE id = ?
      AND user_id = ?
      AND is_deleted = 0
    `;
 
    const [rows] = await db.execute(sql, [id, user_id]);
 
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Design not found" });
    }
 
    return res.status(200).json({
      success: true,
  message: "Design fetched successfully",
  data: rows[0]
    });
 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
 
 
// ===============================
// UPDATE DESIGN
// ===============================
exports.updateDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
 
    const { name, width, height, template_id } = req.body;
   
 
    const sql = `
      UPDATE designs
      SET name = ?, width = ?, height = ?, template_id = ?, updated_at = NOW()
      WHERE id = ?
      AND user_id = ?
      AND is_deleted = 0
    `;
 
    const [result] = await db.execute(sql, [
      name,
      width || null,
      height || null,
      template_id || null,
      id,
      user_id
    ]);
 
    if (result.affectedRows === 0) {
      return res.status(404).json({
          success: false,
        message: "Design not found" });
    }
 
    return res.status(200).json({
      success: true,
      message: "Design updated successfully"
    });
 
  } catch (error) {
    console.error(error);
    // DB duplicate name error handle
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ success: false, message: "Design name already exists" });
    }
    return next(error); // existing errorHandler
  }
};
 
// ===============================
// DELETE DESIGN (Soft Delete)
// ===============================
exports.deleteDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
 
    const sql = `
      UPDATE designs
      SET is_deleted = 1, updated_at = NOW()
      WHERE id = ?
      AND user_id = ?
      AND is_deleted = 0
    `;
 
    const [result] = await db.execute(sql, [id, user_id]);
 
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Design not found" });
    }
 
    return res.status(200).json({
      success: true,
      message: "Design moved to trash successfully"
    });
 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.restoreDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
 
    const sql = `
      UPDATE designs
      SET is_deleted = 0,
          updated_at = NOW()
      WHERE id = ?
      AND user_id = ?
      AND is_deleted = 1
    `;
 
    const [result] = await db.execute(sql, [id, user_id]);
 
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Design not found in trash" });
    }
 
    return res.status(200).json({
      success: true,
      message: "Design restored successfully"
    });
 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
 