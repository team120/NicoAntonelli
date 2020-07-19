import dotenv from "dotenv";

// config method will parse the env file and assign its contents to process.env
dotenv.config();

export const env = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  googleAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: "http://localhost:3000/auth/google/callback",
  },
};
