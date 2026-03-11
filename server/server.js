import express from "express";
import cors from "cors";
import 'dotenv/config';
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en puerto http://localhost:${PORT}`);
});