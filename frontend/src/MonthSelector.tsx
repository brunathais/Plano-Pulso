const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function MonthSelector({
  month,
  year,
  onChange,
}: {
  month: number;
  year: number;
  onChange: (year: number, month: number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <select
        value={month}
        onChange={(e) => onChange(year, Number(e.target.value))}
        style={{ padding: 8, borderRadius: 8 }}
      >
        {months.map((m, index) => (
          <option key={m} value={index}>
            {m}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={year}
        onChange={(e) => onChange(Number(e.target.value), month)}
        style={{ width: 100, padding: 8, borderRadius: 8 }}
      />
    </div>
  );
}
