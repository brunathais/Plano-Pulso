export default function PeriodCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 15 }}>
      <h4 style={{ marginBottom: 10 }}>{title}</h4>

      {items.length === 0 ? (
        <p style={{ color: "#999999ff" }}>nenhuma meta</p>
      ) : (
        <ul>
            {items.map((item, index) => (
                <li key={index}> {item} </li>
            ))}
        </ul>
      )}
    </div>
  );
}
