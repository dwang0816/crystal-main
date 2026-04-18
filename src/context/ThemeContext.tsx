import { createContext, useContext, useState, useEffect } from 'react';

// ── Detect whether it's currently daytime in New York ────────────────────────
function isNYDaytime(): boolean {
    const h = parseInt(
        new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York',
            hour: 'numeric',
            hour12: false,
            hourCycle: 'h23',
        }),
        10,
    );
    return h >= 6 && h < 20;
}

// ── Context ──────────────────────────────────────────────────────────────────
interface ThemeCtx {
    isDark: boolean;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({ isDark: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Default: dark when it's night in NY
    const [isDark, setIsDark] = useState(() => !isNYDaytime());

    // Apply / remove the `dark` class on <html>
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    const toggle = () => setIsDark(d => !d);

    return (
        <ThemeContext.Provider value={{ isDark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeCtx {
    return useContext(ThemeContext);
}
