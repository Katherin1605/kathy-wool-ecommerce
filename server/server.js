import express from "express";
import cors from "cors";
import 'dotenv/config';
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(productsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});


app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en puerto http://localhost:${PORT}`);
});