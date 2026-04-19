import { ChatGoogle } from "@langchain/google";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogle({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.5-flash",
});

export const getAiResponse = async () => {
    const response = await model.invoke("hello, who are you?")
        .then((res) => {
            console.log(res.text);
        })
        .catch((err) => {
            console.log(err);
        });
};