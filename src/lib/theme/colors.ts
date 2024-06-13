import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const alchemyColors = {
	'alchemy-primary': '#272266',
	'alchemy-secondary': '#43B14A',
	'alchemy-tertiary': '#FFC918',
	'alchemy-success': '#4F67AF',
	'alchemy-warning': '#F57C00',
	'alchemy-error': '#FF3333',
	'alchemy-surface': '#0c0a1f',
	'alchemy-surface-light': '#ceced2',
	'alchemy-surface-dark': '#06050f',
};

export const mapSpeedTheme: CustomThemeConfig = {
    name: 'map-speed-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "4px",
		"--theme-rounded-container": "4px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #F80202 
		"--color-primary-50": "254 217 217", // #fed9d9
		"--color-primary-100": "254 204 204", // #fecccc
		"--color-primary-200": "253 192 192", // #fdc0c0
		"--color-primary-300": "252 154 154", // #fc9a9a
		"--color-primary-400": "250 78 78", // #fa4e4e
		"--color-primary-500": "248 2 2", // #F80202
		"--color-primary-600": "223 2 2", // #df0202
		"--color-primary-700": "186 2 2", // #ba0202
		"--color-primary-800": "149 1 1", // #950101
		"--color-primary-900": "122 1 1", // #7a0101
		// secondary | #000103 
		"--color-secondary-50": "217 217 217", // #d9d9d9
		"--color-secondary-100": "204 204 205", // #cccccd
		"--color-secondary-200": "191 192 192", // #bfc0c0
		"--color-secondary-300": "153 153 154", // #99999a
		"--color-secondary-400": "77 77 79", // #4d4d4f
		"--color-secondary-500": "0 1 3", // #000103
		"--color-secondary-600": "0 1 3", // #000103
		"--color-secondary-700": "0 1 2", // #000102
		"--color-secondary-800": "0 1 2", // #000102
		"--color-secondary-900": "0 0 1", // #000001
		// tertiary | #3772FF 
		"--color-tertiary-50": "225 234 255", // #e1eaff
		"--color-tertiary-100": "215 227 255", // #d7e3ff
		"--color-tertiary-200": "205 220 255", // #cddcff
		"--color-tertiary-300": "175 199 255", // #afc7ff
		"--color-tertiary-400": "115 156 255", // #739cff
		"--color-tertiary-500": "55 114 255", // #3772FF
		"--color-tertiary-600": "50 103 230", // #3267e6
		"--color-tertiary-700": "41 86 191", // #2956bf
		"--color-tertiary-800": "33 68 153", // #214499
		"--color-tertiary-900": "27 56 125", // #1b387d
		// success | #59CD90 
		"--color-success-50": "230 248 238", // #e6f8ee
		"--color-success-100": "222 245 233", // #def5e9
		"--color-success-200": "214 243 227", // #d6f3e3
		"--color-success-300": "189 235 211", // #bdebd3
		"--color-success-400": "139 220 177", // #8bdcb1
		"--color-success-500": "89 205 144", // #59CD90
		"--color-success-600": "80 185 130", // #50b982
		"--color-success-700": "67 154 108", // #439a6c
		"--color-success-800": "53 123 86", // #357b56
		"--color-success-900": "44 100 71", // #2c6447
		// warning | #FFC600 
		"--color-warning-50": "255 246 217", // #fff6d9
		"--color-warning-100": "255 244 204", // #fff4cc
		"--color-warning-200": "255 241 191", // #fff1bf
		"--color-warning-300": "255 232 153", // #ffe899
		"--color-warning-400": "255 215 77", // #ffd74d
		"--color-warning-500": "255 198 0", // #FFC600
		"--color-warning-600": "230 178 0", // #e6b200
		"--color-warning-700": "191 149 0", // #bf9500
		"--color-warning-800": "153 119 0", // #997700
		"--color-warning-900": "125 97 0", // #7d6100
		// error | #B43E8F 
		"--color-error-50": "244 226 238", // #f4e2ee
		"--color-error-100": "240 216 233", // #f0d8e9
		"--color-error-200": "236 207 227", // #eccfe3
		"--color-error-300": "225 178 210", // #e1b2d2
		"--color-error-400": "203 120 177", // #cb78b1
		"--color-error-500": "180 62 143", // #B43E8F
		"--color-error-600": "162 56 129", // #a23881
		"--color-error-700": "135 47 107", // #872f6b
		"--color-error-800": "108 37 86", // #6c2556
		"--color-error-900": "88 30 70", // #581e46
		// surface | #7E7F83 
		"--color-surface-50": "236 236 236", // #ececec
		"--color-surface-100": "229 229 230", // #e5e5e6
		"--color-surface-200": "223 223 224", // #dfdfe0
		"--color-surface-300": "203 204 205", // #cbcccd
		"--color-surface-400": "165 165 168", // #a5a5a8
		"--color-surface-500": "126 127 131", // #7E7F83
		"--color-surface-600": "113 114 118", // #717276
		"--color-surface-700": "95 95 98", // #5f5f62
		"--color-surface-800": "76 76 79", // #4c4c4f
		"--color-surface-900": "62 62 64", // #3e3e40
		
	}
}