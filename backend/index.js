import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";

dotenv.config();

const application = express();
const PORT = process.env.PORT || 8000;
application.use(cors());
application.use(express.json());
application.use(express.urlencoded({ extended: true }));

application.use(
  "/api/users",
  (await import("./routes/user.routes.js")).default
);
application.use(
  "/api/blogs",
  (await import("./routes/blog.routes.js")).default
);
application.use(
  "/api/projects",
  (await import("./routes/project.routes.js")).default
);
application.use(
  "/api/skills",
  (await import("./routes/skill.routes.js")).default
);
application.use(
  "/api/achievements",
  (await import("./routes/achievment.routes.js")).default
);
application.use(
  "/api/education",
  (await import("./routes/education.routes.js")).default
);
application.use(
  "/api/experience",
  (await import("./routes/experience.routes.js")).default
);

connectDB();

application.get("/", (request, response) => {
  response.send("Hello World!");
});

application.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
