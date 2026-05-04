import { defineConfig, type UserConfig } from 'tsdown';
import Replace from 'unplugin-replace/rolldown';

const baseOptions: UserConfig = {
	clean: true,
	entry: ['src/**/*.ts'],
	dts: true,
	minify: false,
	deps: { skipNodeModulesBundle: true },
	sourcemap: true,
	target: 'es2021',
	tsconfig: 'src/tsconfig.json',
	treeshake: true
};

export function createTsdownConfig(options: UserConfig = {}) {
	return defineConfig([
		{
			...baseOptions,
			...options,
			outDir: 'dist/cjs',
			format: 'cjs',
			banner: { js: "'use strict';\n" }
		},
		{
			...baseOptions,
			...options,
			outDir: 'dist/esm',
			format: 'esm'
		}
	]);
}

export function versionInjectorPlugin(version: string) {
	return Replace({
		values: [
			{
				find: /\[VI\]{{inject}}\[\/VI\]/,
				replacement: version
			}
		]
	});
}
