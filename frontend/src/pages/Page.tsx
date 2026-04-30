export default function Page({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>{children}</div>;
}
