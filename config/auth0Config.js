import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
dotenv.config();

const jwtCheck = auth({
  audience: `${process.env.NODE_BASE_URL}`,
  issuerBaseURL: `${process.env.ISSUER_BASE_URL}`,
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
