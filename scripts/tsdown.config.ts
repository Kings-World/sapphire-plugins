import { defineConfig, type UserConfig } from 'tsdown';

const baseOptions: UserConfig = {
	clean: true,
	entry: ['src/**/*.ts'],
	dts: true,
	minify: false,
	deps: { skipNodeModulesBundle: true },
	sourcemap: true,
	target: 'es2021',
	tsconfig: 'src/tsconfig.json',
	plugins: [],
	treeshake: true
};

export function createTsdownConfig() {
	return defineConfig([
		{
			...baseOptions,
			outDir: 'dist/cjs',
			format: 'cjs',
			banner: { js: "'use strict';\n" }
		},
		{
			...baseOptions,
			outDir: 'dist/esm',
			format: 'esm'
		}
	]);
}
