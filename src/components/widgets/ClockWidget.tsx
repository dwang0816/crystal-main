import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

function getTimeForTimezone(now: Date, tz: string) {
    const time = now.toLocaleTimeString("en-US", {
        timeZone: tz,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    const h = parseInt(
        now.toLocaleString("en-US", { timeZone: tz, hour: "numeric", hour12: false, hourCycle: "h23" }),
        10,
    );
    return { time, isDay: h >= 6 && h < 20 };
}

function TimeBar({ city, region, tz }: { city: string; region: string; tz: string }) {
    const [, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTick((t) => t + 1), 60000);
        return () => clearInterval(interval);
    }, []);

    const { time, isDay } = getTimeForTimezone(new Date(), tz);

    return (
        <div className="flex flex-col gap-1">
            <span className="text-[11px] font-normal text-black/40 px-1.5 font-serif tracking-wide">
                {city}, <span className="uppercase">{region}</span>
            </span>
            <div className="flex items-center gap-2.5 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-2">
                {isDay
                    ? <SunIcon className="size-4 text-amber-500 shrink-0" />
                    : <MoonIcon className="size-4 text-indigo-400 shrink-0" />
                }
                <span className="text-[13.5px] font-serif text-slate-800 whitespace-nowrap">{time}</span>
            </div>
        </div>
    );
}

export function ClockWidget() {
    return (
        <div className="flex gap-4 items-start">
            <TimeBar city="port dickson" region="MY" tz="Asia/Kuala_Lumpur" />
            <TimeBar city="new york" region="NY" tz="America/New_York" />
        </div>
    );
}
