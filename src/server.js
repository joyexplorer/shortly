import express from "express";
import cors from "cors";
import users from "./routes/signup.routes.js"
import links from "./routes/links.routes.js"

const server = express();
server.use(cors());
server.use(express.json());
server.use(users);
server.use(links);

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server running in port ${port}`));