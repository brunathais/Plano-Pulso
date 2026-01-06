import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);

  const [result, setResult] = useState<string>("");

  async function testApi() {
    console.log("🔵 Botão clicado!");

    try {
      console.log("🟡 Chamando API...");
      const response = await fetch("http://localhost:3332/health");

      console.log("🟢 Status:", response.status);

      const data = await response.json();
      console.log("🟣 Data:", data);

      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("🔴 Erro no fetch:", error);
      setResult("❌ Erro ao conectar com o backend.");
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <p>A PARTIR DAQUI ESTOU MEXENDO!!!</p>

      <button onClick={testApi}>testar API</button>

      <pre>Usando o pre: {result} </pre>
    </>
  );
}
