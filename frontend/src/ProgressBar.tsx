export default function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ width: 120 }}>
      <div style={{ height: 8, background: "#2a2a2f", borderRadius: 99 }}>
        <div
          style={{
            height: 8,
            width: `${value}%`,
            background: "linear-gradient(90deg, #34d399, #22c55e)",
            borderRadius: 99,
          }}
        />
      </div>
      <small style={{ opacity: 0.7 }}>{value.toFixed(0)}%</small>
    </div>
  );
}
