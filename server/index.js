import connect from "./utlis/db.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import News from "./modal/News.js"



const app = express()
const port = 8000

app.use(cors())
app.use(bodyParser.json());
connect();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/news', async (req, res) => {
    try {
        const response = await News.find().sort({createdAt:-1});
        if (response)
            return res.status(200).json({ data: response });
        else
            return res.status(400).json({ msg: "Something went wrong" })
    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong" })
    }
})

app.post("/news", async (req, res) => {
    const { title, data } = req.body;

    if (title == "")
        return res.status(400).json({ msg: "Please enter title" });

    if (data == "")
        return res.status(400).json({ msg: "Please enter data" });

    try {
        const response = await News.create({ title, data });
        if (response)
            return res.status(200).json({ msg: "Post Succesfully created" });
        else
            return res.status(400).json({ msg: "Something went wrong" });
    } catch (error) {
        return res.status(400).json({ msg: error })
    }
})

app.listen(port, () => console.log("Server is running :" + port))