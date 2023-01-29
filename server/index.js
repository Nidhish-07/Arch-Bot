import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";

const app = express();


app.use(express.json());
app.use(cors());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 3000

app.get("/", async (req, res) => {
    res.status(200).send("hello");
});

app.post("/", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            prompt: `${prompt}`,
            model: "text-davinci-003",
            temperature: 10,
            max_tokens: 2500,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).send({ botData: response.data.choices[0].text })
    } catch (error) {

        // console.log(error);
        res.status(500).send(error)
    }
});

app.listen(port, () => {
    console.log("Server listening on port http://localhost:" + port);
})
