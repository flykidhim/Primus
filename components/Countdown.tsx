"use client";
import { useEffect, useMemo, useState } from "react";
export default function Countdown({ to }: { to: string }) {
  const target = useMemo(() => new Date(to).getTime(), [to]);
  const [left, setLeft] = useState(Math.max(0, target - Date.now()));
  useEffect(() => {
    const id = setInterval(
      () => setLeft(Math.max(0, target - Date.now())),
      1000
    );
    return () => clearInterval(id);
  }, [target]);
  const s = Math.floor(left / 1000),
    d = Math.floor(s / 86400),
    h = Math.floor((s % 86400) / 3600),
    m = Math.floor((s % 3600) / 60),
    sec = s % 60;
  return (
    <div className="text-xs sm:text-sm text-gray-600">
      Kickoff in{" "}
      <span className="font-semibold">
        {d}d {h}h {m}m {sec}s
      </span>
    </div>
  );
}
