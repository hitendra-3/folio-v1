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
    <footer className="mt-24 flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-6 text-[13px] text-black/50 dark:text-white/50 font-sans">
      <div className="flex items-center gap-2">
        <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 cursor-default">
          © {new Date().getFullYear()} Hitendra S
        </span>
        <span className="text-black/20 dark:text-white/20">•</span>
        <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 cursor-default">
          build v1.2.0
        </span>
      </div>
      <div className="flex items-center gap-1.5 tabular-nums">
        {time ? (
          <>
            <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 cursor-default">
              {time.toLowerCase()}
            </span>
            <span className="text-black/20 dark:text-white/20">•</span>
            <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 cursor-default">
              IST
            </span>
          </>
        ) : (
          <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 cursor-default">
            IST
          </span>
        )}
      </div>
    </footer>
  );
}
