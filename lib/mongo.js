import { MongoClient } from "mongodb";

const USER = "rampmail29";
const PASSWORD = "hMUWqHD81q34toP3";
const DB_NAME_REMOTO = "ClusterWFS-MinTic";
const DB_HOST_REMOTO = "clusterwfs-mintic.ocxig.mongodb.net";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EJEMPLO:
//mongodb+srv://rampmail29:<db_password>@clusterwfs-mintic.ocxig.mongodb.net/?retryWrites=true&w=majority&appName=ClusterWFS-MinTic
//endpoint      usuario   : pasword      host remoto de la base de datos     resto de código de la URL            Nombre de la BD
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST_REMOTO}/${DB_NAME_REMOTO}?retryWrites=true&w=majority&appName=ClusterWFS-MinTic`;

export class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      tls: true,
      serverSelectionTimeoutMS: 3000,
      autoSelectFamily: false,
    });
    this.dbName = DB_NAME_REMOTO;
  }

  async connect() {
    try {
      if (!this.connection) {
        console.log("Conectando a la BBDD...");
        this.connection = await this.client.connect();
        console.log("Conectado a la BBDD");
      }
      return this.connection.db(this.dbName);
    } catch (error) {
      console.error("Error en la conexión con la BBDD:", error);
      throw new Error("No se pudo conectar a la base de datos");
    }
  }
  async close() {
    if (this.client) {
      await this.client.close();
      console.log("Conexión cerrada");
    }
  }
}
