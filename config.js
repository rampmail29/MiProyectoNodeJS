import {config} from 'dotenv';
config();

//almacena el port, si no existe coloca el 4000
export const PORT = process.env.PORT || 4000


