import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { Separator } from "../ui/Separator";
import { Label } from "../ui/Label";

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

export function ClockWidget() {
    const [, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTick((t) => t + 1), 60000);
        return () => clearInterval(interval);
    }, []);

    const now = new Date();
    const nyc = getTimeForTimezone(now, "America/New_York");
    const kl = getTimeForTimezone(now, "Asia/Kuala_Lumpur");

    return (
        <div className="rounded-sm border border-slate-200 bg-white shadow w-[160px] h-[150px] sm:w-[200px] sm:h-[180px]">
            <div className="flex px-4 py-2 flex-col h-full gap-0">
                <div className="flex flex-1 w-full flex-col justify-center gap-2">
                    <div className="flex w-full items-center justify-between">
                        <Label className="text-black text-xs font-normal font-serif">New York</Label>
                        {nyc.isDay ? (
                            <SunIcon className="size-4 text-amber-500" />
                        ) : (
                            <MoonIcon className="size-4 text-indigo-400" />
                        )}
                    </div>
                    <h3 className="font-semibold tracking-tight text-slate-900 text-xl font-serif font-normal">{nyc.time}</h3>
                </div>
                <Separator />
                <div className="flex flex-1 w-full flex-col justify-center gap-2">
                    <div className="flex w-full items-center justify-between">
                        <Label className="text-black text-xs font-normal font-serif">Kuala Lumpur</Label>
                        {kl.isDay ? (
                            <SunIcon className="size-4 text-amber-500" />
                        ) : (
                            <MoonIcon className="size-4 text-indigo-400" />
                        )}
                    </div>
                    <h3 className="font-semibold tracking-tight text-slate-900 text-xl font-serif font-normal">{kl.time}</h3>
                </div>
            </div>
        </div>
    );
}
