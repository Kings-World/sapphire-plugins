import { createTsdownConfig, versionInjectorPlugin } from '../../scripts/tsdown.config';
import { version } from './package.json';

export default createTsdownConfig({
	plugins: [versionInjectorPlugin(version)]
});
