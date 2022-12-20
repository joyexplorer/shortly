import express, { application } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));