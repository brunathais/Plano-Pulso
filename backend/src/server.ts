import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

app.get("/health", (req, res) => {
      console.log("✅ Health check chamado");
    res.json({status: "ok", message: "Plano & Pulso API rodando!"});
})

const PORT = process.env.PORT || 3332;
app.listen(PORT, ()=> {
    console.log(`Server rodando em http://localhost:${PORT}`);
})
