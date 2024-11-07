import express from "express";
import trabajadoresRoutes from "./src/routes/trabajadores.routes.js";
import cors from 'cors';
import pkg from 'express-validator';
import { formatoRta } from "./src/scripts/formatoRta.js";
//const { body, query, matchedData, validationResult, ExpressValidator, CustomValidationChain, ValidationChain } = pkg;

const app = express();

app.use(cors({ origin: 'https://ttproject.netlify.app/' }));

app.use(express.json());

app.use('/api', trabajadoresRoutes);

////////////////////////////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
    console.log("peticion a ruta no encontrada...");
    res.status(404).json(formatoRta("", "endpoint no encontrado...."));
});

export default app;