import express from "express";
import cors from "cors";
import 'dotenv/config';
import pool from "./db/config.js";
import usersRoutes from "./routes/usersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  // Forzar a que el navegador sepa que viaja texto/HTML en UTF-8
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  // Desactivar caché temporalmente para evitar el error 304
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  next();
});

app.use(productsRoutes);
app.use(categoriesRoutes);
app.use("/api", cartRoutes);
app.use("/api", checkoutRoutes);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

pool.query("SELECT NOW()")
  .then(() => {
    console.log("🟢 Base de datos conectada");
  })
  .catch((error) => {
    console.error("🔴 Error conectando a la base de datos:", error);
  });

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🔥 Servidor corriendo en puerto http://localhost:${PORT}`);
  });
}

export default app;

