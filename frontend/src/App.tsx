import { useState } from "react";
// import "./App.css";
import Dashboard from "./pages/Dashboard";
import Week from "./pages/Week";
import TasksPage from "./pages/TasksPage";
import Page from "./pages/Page";
import Header from "./pages/Header";
import PlannerPage from "./pages/PlannerPage";

export default function App() {
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
      <button onClick={testApi}>testar API</button>

      <pre>Usando o pre: {result} </pre>

      <Dashboard></Dashboard>

      <Week></Week>

      <TasksPage></TasksPage>

      <Page>
        <Header></Header>
        <PlannerPage></PlannerPage>
      </Page>
    </>
  );
}
