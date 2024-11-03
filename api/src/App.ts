import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import { auth } from "express-openid-connect";

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "lodN6t7hfT2HxybRU1qnc16KJKui7JUW",
  issuerBaseURL: "https://dev-vvztjksljjvfv0t3.us.auth0.com",
};

const app = express();

app.set("trust proxy", true);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(auth(config));
app.use(router);

export default app;
