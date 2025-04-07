/*
 * Credits to Sapphire for this
 * https://github.com/sapphiredev/utilities/blob/main/packages/cron/src/lib/constants.ts#L26-L57
 * https://github.com/sapphiredev/utilities/blob/main/packages/cron/src/lib/Cron.ts#L91
 */

const predefined = {
	'@annually': '0 0 1 1 *',
	'@yearly': '0 0 1 1 *',
	'@monthly': '0 0 1 * *',
	'@weekly': '0 0 * * 0',
	'@daily': '0 0 * * *',
	'@hourly': '0 * * * *'
} as const;

const cronTokens: Record<string, number> = {
	jan: 1,
	feb: 2,
	mar: 3,
	apr: 4,
	may: 5,
	jun: 6,
	jul: 7,
	aug: 8,
	sep: 9,
	oct: 10,
	nov: 11,
	dec: 12,
	sun: 0,
	mon: 1,
	tue: 2,
	wed: 3,
	thu: 4,
	fri: 5,
	sat: 6
} as const;

const tokensRegex = new RegExp(Object.keys(cronTokens).join('|'), 'g');

export function normalizePattern(pattern: string): string {
	if (Reflect.has(predefined, pattern)) return Reflect.get(predefined, pattern);
	return pattern.replace(tokensRegex, (match) => String(Reflect.get(cronTokens, match)));
}
