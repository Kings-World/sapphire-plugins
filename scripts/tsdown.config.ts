import { defineConfig, type UserConfig } from 'tsdown';
import Replace from 'unplugin-replace/rolldown';

const baseOptions: UserConfig = {
	clean: true,
	entry: ['src/**/*.ts'],
	dts: true,
	minify: false,
	deps: { neverBundle: true },
	sourcemap: true,
	target: 'es2024',
	tsconfig: 'src/tsconfig.json',
	treeshake: true,
	outDir: 'dist',
	format: 'esm'
};

export function createTsdownConfig(options: UserConfig = {}) {
	return defineConfig({ ...baseOptions, ...options });
}

export function versionInjectorPlugin(version: string) {
	return Replace({
		values: [
			{
				find: /\[VI]{{inject}}\[\/VI]/,
				replacement: version
			}
		]
	});
}
