import express from "express";
import cors from "cors";
import 'dotenv/config';
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(productsRoutes);
app.use(categoriesRoutes);
app.use("/api", cartRoutes);
app.use("/api", checkoutRoutes);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});


app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en puerto http://localhost:${PORT}`);
});