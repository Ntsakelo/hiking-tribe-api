import 'dotenv/config';
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import router from './router/index';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(env.PORT, () => {
    console.log("Server running on http://localhost:8080");
});

mongoose.Promise = Promise;
mongoose.connect(env.MONGO_CONNECTION_STRING);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());

