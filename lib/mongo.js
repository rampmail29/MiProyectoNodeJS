import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const USER = process.env.MONGO_USER;
const PASSWORD = process.env.MONGO_PASSWORD;
const DB_NAME_REMOTO = process.env.MONGO_DB_NAME;
const DB_HOST_REMOTO = process.env.MONGO_DB_HOST;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST_REMOTO}/${DB_NAME_REMOTO}?retryWrites=true&w=majority&appName=${DB_NAME_REMOTO}`;

const MONGO_OPTIONS = {
  tls: true,
  serverSelectionTimeoutMS: 3000,
  autoSelectFamily: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, MONGO_OPTIONS);
    this.dbName = DB_NAME_REMOTO;
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
