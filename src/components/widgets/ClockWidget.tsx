import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

function getTimeForTimezone(now: Date, tz: string) {
    const h = parseInt(
        now.toLocaleString("en-US", { timeZone: tz, hour: "numeric", hour12: false, hourCycle: "h23" }),
        10,
    );
    const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: tz,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    // Get seconds separately
    const seconds = now.toLocaleTimeString("en-US", {
        timeZone: tz,
        second: "2-digit",
    }).split(":").pop()?.replace(/[^0-9]/g, "").padStart(2, "0") ?? "00";

    // Split time into main + period (AM/PM)
    const periodMatch = timeStr.match(/(AM|PM)$/i);
    const period = periodMatch ? periodMatch[0] : "";
    const mainTime = timeStr.replace(/(AM|PM)$/i, "").trim();

    return { mainTime, seconds, period, isDay: h >= 6 && h < 20 };
}

function TimeBar({ city, region, tz }: { city: string; region: string; tz: string }) {
    const [, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTick((t) => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const { mainTime, seconds, period, isDay } = getTimeForTimezone(new Date(), tz);

    return (
        <div className="flex flex-col gap-1 flex-1 min-w-0 group/bar">
            <span className="text-[11px] font-normal text-black/40 px-1.5 font-serif tracking-wide truncate">
                {city}, <span className="uppercase">{region}</span>
            </span>
            <div className="
                flex items-center gap-2.5 w-full
                bg-white border border-slate-200 shadow-sm rounded-full px-4 py-2
                transition-all duration-300
                group-hover/bar:shadow-[0_4px_16px_rgba(0,0,0,0.12)]
                group-hover/bar:border-slate-300
                group-hover/bar:-translate-y-[1px]
            ">
                {isDay
                    ? <SunIcon className="size-4 text-amber-500 shrink-0" />
                    : <MoonIcon className="size-4 text-indigo-400 shrink-0" />
                }
                <span className="text-[13.5px] font-serif text-slate-800 whitespace-nowrap tabular-nums">
                    {mainTime}
                    <span className="text-[11px] text-slate-400 ml-[2px] tabular-nums">
                        :{seconds}
                    </span>
                    <span className="text-[11px] text-slate-500 ml-1">{period}</span>
                </span>
            </div>
        </div>
    );
}

export function ClockWidget({ className, direction = 'horizontal' }: { className?: string; direction?: 'horizontal' | 'vertical' }) {
    return (
        <div className={`flex w-full ${direction === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-3 items-start'} ${className ?? ""}`}>
            <TimeBar city="port dickson" region="MY" tz="Asia/Kuala_Lumpur" />
            <TimeBar city="new york" region="NY" tz="America/New_York" />
        </div>
    );
}
