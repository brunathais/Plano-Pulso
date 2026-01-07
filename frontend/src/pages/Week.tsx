import { useState } from "react";
import { weekMock, type DayPlan } from "./Dashboard";
import DayDetails from "./DayDetails";

export default function Week() {
  const [selectedDay, setSelectedDay] = useState<DayPlan>(weekMock[0]);

  return (
    <div style={{ padding: 20 }}>
      <h2>📅 Calendário Semanal</h2>

      {/* VISÃO GERAL - TODOS OS DIAS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 12,
          marginTop: 20,
        }}
      >
        {weekMock.map((day) => (
          <div
            key={day.date}
            onClick={() => setSelectedDay(day)}
            style={{
              borderRadius: 12,
              border:
                selectedDay.date === day.date
                  ? "2px solid #000"
                  : "1px solid #ddd",
              padding: 10,
              cursor: "pointer",
              background: selectedDay.date === day.date ? "#5e1d1dff" : "#464242ff",
              minHeight: 220,
            }}
          >
            {/* Cabeçalho do dia */}
            <div style={{ marginBottom: 10 }}>
              <strong>{day.label}</strong>
              <div style={{ fontSize: 12, color: "#777" }}>{day.date}</div>
            </div>

            {/* 3 módulos por dia */}
            <MiniPeriod title="Manhã" items={day.periods.manha} />
            <MiniPeriod title="Tarde" items={day.periods.tarde} />
            <MiniPeriod title="Noite" items={day.periods.noite} />
          </div>
        ))}
      </div>

      {/* DETALHAMENTO - SOMENTE O DIA CLICADO */}
      <div
        style={{
          marginTop: 30,
          borderTop: "1px solid #ddd",
          paddingTop: 20,
        }}
      >
        <DayDetails day={selectedDay} />
      </div>
    </div>
  );
}

/* COMPONENTE: mini blocos (Manhã / Tarde / Noite) */
function MiniPeriod({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 600 }}>{title}</div>

      {items.length === 0 ? (
        <div style={{ fontSize: 12, color: "#aaa" }}>—</div>
      ) : (
        <ul style={{ margin: "5px 0 0", paddingLeft: 15, fontSize: 12 }}>
          {items.slice(0, 3).map((item, index) => (
            <li key={index}>{item}</li>
          ))}

          {/* Se tiver mais de 3, mostra "..." */}
          {items.length > 3 && <li style={{ color: "#999" }}>...</li>}
        </ul>
      )}
    </div>
  );


}
