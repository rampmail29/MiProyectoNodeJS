import express from "express";
import trabajadoresRoutes from "./src/routes/trabajadores.routes.js";
import cors from "cors";
import { formatoRta } from "./src/scripts/formatoRta.js";

const app = express();

// Use CORS middleware and allow all origins (you can specify domains instead of * if you want to restrict access)
app.use(cors({ origin: "*" }));

app.use(express.json());

// Use your custom routes
app.use("/api", trabajadoresRoutes);

// Handle 404 errors for non-existing routes
app.use((req, res, next) => {
  console.log("Petición a ruta no encontrada...");
  res.status(404).json(formatoRta("", "endpoint no encontrado...."));
});

// Export the app
export default app;
