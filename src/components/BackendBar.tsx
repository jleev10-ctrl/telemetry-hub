import { useEffect, useState } from "react";

type Status = "off" | "on" | "rdy";

interface Service {
  label: string;
  initial: Status;
  delay?: number;
  next?: Status;
}

const services: Service[] = [
  { label: "Supabase", initial: "off" },
  { label: "Auth", initial: "off" },
  { label: "Telemetry", initial: "off", delay: 3000, next: "rdy" },
  { label: "Voice", initial: "off" },
  { label: "G13", initial: "off", delay: 4200, next: "rdy" },
  { label: "GitHub", initial: "on" },
];

export const BackendBar = () => {
  const [statuses, setStatuses] = useState<Status[]>(services.map((s) => s.initial));

  useEffect(() => {
    const timers = services.map((s, i) => {
      if (s.delay && s.next) {
        return setTimeout(() => {
          setStatuses((prev) => {
            const copy = [...prev];
            copy[i] = s.next!;
            return copy;
          });
        }, s.delay);
      }
      return null;
    });
    return () => {
      timers.forEach((t) => t && clearTimeout(t));
    };
  }, []);

  return (
    <div className="bg-card border-b border-syndicate/50 py-[5px] px-2.5 flex gap-[14px] flex-wrap items-center font-mono">
      {services.map((s, i) => (
        <div key={s.label} className="flex items-center gap-[5px] text-[9px] text-muted-foreground tracking-[1px] uppercase">
          <span
            className={`w-[6px] h-[6px] rounded-full ${
              statuses[i] === "on"
                ? "bg-green animate-blink"
                : statuses[i] === "rdy"
                ? "bg-gold"
                : "bg-[#333]"
            }`}
          />
          {s.label}
        </div>
      ))}
    </div>
  );
};
