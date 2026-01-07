import type { DayPlan, Period } from "./Dashboard";

export default function DayDetails({day}: {day: DayPlan}){
    return (
        <div>
<h2>detalhes</h2>

<p>
    <strong>Dia:</strong> {day.label} ({day.date})
</p>

<h3>✅ Metas e Planejamento</h3>

{(["manha", "tarde", "noite"] as Period[]).map((period) =>(
    <div key={period} style={{ marginBottom: 15 }}>
        <strong style={{ textTransform: "capitalize" }}>{period}</strong>
        <div style={{ marginTop: 5 }}>
            {day.periods[period].length === 0 ? (
                <p style={{ color: "#999" }}>nenhuma meta</p>
            ) : (
                <ul>
                    {day.periods[period].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )} </div>
        </div>
))}
        </div>
    )
}