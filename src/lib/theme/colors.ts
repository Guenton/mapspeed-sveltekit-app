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
		'--theme-font-family-base': `Outfit`,
		'--theme-font-family-heading': `RacingSansOne`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '4px',
		'--theme-rounded-container': '4px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #EC1B1E
		'--color-primary-50': '252 221 221', // #fcdddd
		'--color-primary-100': '251 209 210', // #fbd1d2
		'--color-primary-200': '250 198 199', // #fac6c7
		'--color-primary-300': '247 164 165', // #f7a4a5
		'--color-primary-400': '242 95 98', // #f25f62
		'--color-primary-500': '236 27 30', // #EC1B1E
		'--color-primary-600': '212 24 27', // #d4181b
		'--color-primary-700': '177 20 23', // #b11417
		'--color-primary-800': '142 16 18', // #8e1012
		'--color-primary-900': '116 13 15', // #740d0f
		// secondary | #F2A65A
		'--color-secondary-50': '253 242 230', // #fdf2e6
		'--color-secondary-100': '252 237 222', // #fcedde
		'--color-secondary-200': '252 233 214', // #fce9d6
		'--color-secondary-300': '250 219 189', // #fadbbd
		'--color-secondary-400': '246 193 140', // #f6c18c
		'--color-secondary-500': '242 166 90', // #F2A65A
		'--color-secondary-600': '218 149 81', // #da9551
		'--color-secondary-700': '182 125 68', // #b67d44
		'--color-secondary-800': '145 100 54', // #916436
		'--color-secondary-900': '119 81 44', // #77512c
		// tertiary | #000000
		'--color-tertiary-50': '217 217 217', // #d9d9d9
		'--color-tertiary-100': '204 204 204', // #cccccc
		'--color-tertiary-200': '191 191 191', // #bfbfbf
		'--color-tertiary-300': '153 153 153', // #999999
		'--color-tertiary-400': '77 77 77', // #4d4d4d
		'--color-tertiary-500': '0 0 0', // #000000
		'--color-tertiary-600': '0 0 0', // #000000
		'--color-tertiary-700': '0 0 0', // #000000
		'--color-tertiary-800': '0 0 0', // #000000
		'--color-tertiary-900': '0 0 0', // #000000
		// success | #F5D7E3
		'--color-success-50': '254 249 251', // #fef9fb
		'--color-success-100': '253 247 249', // #fdf7f9
		'--color-success-200': '253 245 248', // #fdf5f8
		'--color-success-300': '251 239 244', // #fbeff4
		'--color-success-400': '248 227 235', // #f8e3eb
		'--color-success-500': '245 215 227', // #F5D7E3
		'--color-success-600': '221 194 204', // #ddc2cc
		'--color-success-700': '184 161 170', // #b8a1aa
		'--color-success-800': '147 129 136', // #938188
		'--color-success-900': '120 105 111', // #78696f
		// warning | #AA7DCE
		'--color-warning-50': '242 236 248', // #f2ecf8
		'--color-warning-100': '238 229 245', // #eee5f5
		'--color-warning-200': '234 223 243', // #eadff3
		'--color-warning-300': '221 203 235', // #ddcbeb
		'--color-warning-400': '196 164 221', // #c4a4dd
		'--color-warning-500': '170 125 206', // #AA7DCE
		'--color-warning-600': '153 113 185', // #9971b9
		'--color-warning-700': '128 94 155', // #805e9b
		'--color-warning-800': '102 75 124', // #664b7c
		'--color-warning-900': '83 61 101', // #533d65
		// error | #6A0F49
		'--color-error-50': '233 219 228', // #e9dbe4
		'--color-error-100': '225 207 219', // #e1cfdb
		'--color-error-200': '218 195 210', // #dac3d2
		'--color-error-300': '195 159 182', // #c39fb6
		'--color-error-400': '151 87 128', // #975780
		'--color-error-500': '106 15 73', // #6A0F49
		'--color-error-600': '95 14 66', // #5f0e42
		'--color-error-700': '80 11 55', // #500b37
		'--color-error-800': '64 9 44', // #40092c
		'--color-error-900': '52 7 36', // #340724
		// surface | #1D201F
		'--color-surface-50': '221 222 221', // #dddedd
		'--color-surface-100': '210 210 210', // #d2d2d2
		'--color-surface-200': '199 199 199', // #c7c7c7
		'--color-surface-300': '165 166 165', // #a5a6a5
		'--color-surface-400': '97 99 98', // #616362
		'--color-surface-500': '29 32 31', // #1D201F
		'--color-surface-600': '26 29 28', // #1a1d1c
		'--color-surface-700': '22 24 23', // #161817
		'--color-surface-800': '17 19 19', // #111313
		'--color-surface-900': '14 16 15', // #0e100f
	},
};
