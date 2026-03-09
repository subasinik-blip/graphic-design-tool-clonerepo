const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const notificationRoutes = require("./routes/dashboard/notificationRoutes");
const designRoutes = require("./routes/dashboard/designRoutes");
const trashRoutes = require("./routes/dashboard/trashRoutes");
 
const errorHandler = require("./middleware/errorHandler");

const projectsRoutes = require("./routes/dashboard/projectsRoutes");
const templateRoutes = require("./routes/dashboard/templateRoutes");
// const { verifyToken } = require("./middleware/authMiddleware");
const searchRoutes = require("./routes/dashboard/searchRoutes");
const profileRoutes = require("./routes/dashboard/profileRoutes");

 


const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working without MySQL!");
});

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/trash", trashRoutes);

app.use("/api/projects", projectsRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/profile", profileRoutes);

app.use(errorHandler);

/* Start server */
app.listen(5050, () => {
  console.log("Server running on port 5050");
});
