import { useEffect, useState } from "react";

export function Footer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="mt-24 flex items-center justify-between border-t border-border pt-6 text-sm text-muted-foreground">
      <span>© {new Date().getFullYear()} Hitendra S</span>
      <span className="tabular-nums">{time ? `${time.toLowerCase()} • IST` : "IST"}</span>
    </footer>
  );
}
