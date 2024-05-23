import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import svgRoutes from "./routes/svgRoutes.js";
import connectDB from "./mongodb/connect.js";

dotenv.config();

const app = express();
app.use(cors());
const PORT = 3000;
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/svg", svgRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      connectDB(process.env.MONGODB_URL);
      console.log(`Server has started on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
