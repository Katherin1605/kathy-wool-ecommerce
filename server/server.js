import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRoutes from "./routes/productsRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(productsRoutes);
app.use(categoriesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});