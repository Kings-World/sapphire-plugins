import sapphireEslintConfig from '@sapphire/eslint-config';

export default [
	{
		ignores: ['**/node_modules/**', '**/dist/**', '**/*.d.ts', '**/coverage/**']
	},
	...sapphireEslintConfig
];
