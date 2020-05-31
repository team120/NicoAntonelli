import dotenv from "dotenv";

// config method will parse the env file and assign its contents to process.env
dotenv.config();

export const env = {
  port: process.env.PORT,
};
