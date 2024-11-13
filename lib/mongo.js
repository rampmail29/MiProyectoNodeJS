import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const MONGO_OPTIONS = {
  tls: true,
  serverSelectionTimeoutMS: 4000,
  autoSelectFamily: false,
};

export class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, MONGO_OPTIONS);
    this.dbName = process.env.MONGO_DB_NAME;
    this.connection = null;
  }

  async connect() {
    if (!this.connection) {
      try {
        console.log("Conectando a la BBDD...");
        this.connection = await this.client.connect();
        console.log("Conectado a la BBDD");
      } catch (error) {
        console.error("Error en la conexión con la BBDD:", error);
        throw new Error("No se pudo conectar a la base de datos");
      }
    }
    return this.connection.db(this.dbName);
  }

  async close() {
    if (this.client && this.connection) {
      await this.client.close();
      this.connection = null; // Resetea la conexión para permitir una nueva conexión
      console.log("Conexión cerrada");
    }
  }
}
