import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent("สวัสดี Gemini!");
  console.log(result.response.text());
}

run();