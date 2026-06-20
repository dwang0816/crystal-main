/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				/* Body / UI */
				sans:    ['"Hanken Grotesk"', 'sans-serif'],
				hanken:  ['"Hanken Grotesk"', 'sans-serif'],
				/* Editorial headlines */
				serif:   ['"Source Serif 4"', 'serif'],
				heading: ['"Source Serif 4"', 'serif'],
			},
			colors: {
				/* ── shadcn semantic tokens (preserved) ───────────── */
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted-bg))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input:  'hsl(var(--input))',
				ring:   'hsl(var(--ring))',

				/* ── Crystal site palette (named tokens) ──────────── */
				paper:       'var(--paper)',
				'paper-light': 'var(--paper-light)',
				canvas:      'var(--canvas)',
				'nav-card':  'var(--nav-card)',

				ink:         'var(--ink)',
				'ink-muted': 'var(--muted)',
				'ink-soft':  'var(--muted-soft)',

				prussian: {
					DEFAULT: 'var(--prussian)',
					dark:    'var(--prussian-dark)',
					pale:    'var(--prussian-pale)',
				},

				/* Legacy brand alias */
				brand: 'var(--color-brand)',

				/* Hairline border helper (alpha) */
				hairline: 'var(--border-line)',

				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
