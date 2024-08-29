/**
 * This script was made by https://github.com/sapphiredev
 * I am using it to respect the build steps that they use in their plugins
 * @see https://github.com/sapphiredev/plugins/tree/main/scripts
 */

import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';
import { defineConfig, type Options } from 'tsup';

const baseOptions: Options = {
	clean: true,
	entry: ['src/**/*.ts'],
	dts: true,
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: 'es2021',
	tsconfig: 'src/tsconfig.json',
	keepNames: true,
	esbuildPlugins: [esbuildPluginVersionInjector(), esbuildPluginFilePathExtensions()],
	treeshake: true
};

export function createTsupConfig() {
	return [
		defineConfig({
			...baseOptions,
			outDir: 'dist/cjs',
			format: 'cjs',
			outExtension: () => ({ js: '.cjs' })
		}),
		defineConfig({
			...baseOptions,
			outDir: 'dist/esm',
			format: 'esm'
		})
	];
}
