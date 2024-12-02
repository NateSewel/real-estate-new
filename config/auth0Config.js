import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "http://localhost:8000",
  issuerBaseURL: "https://dev-xi66tbymj4q3w4qc.us.auth0.com",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
