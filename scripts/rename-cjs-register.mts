/**
 * This script was made by https://github.com/sapphiredev
 * I am using it to respect the build steps that they use in their plugins
 * @see https://github.com/sapphiredev/plugins/tree/main/scripts
 */

import { bold, green } from 'colorette';
import { rename } from 'node:fs/promises';
import { join } from 'node:path';

const inputPath = 'dist/cjs/register.d.ts';
const outputPath = 'dist/cjs/register.d.cts';

const fullInputPathUrl = join(process.cwd(), inputPath);
const fullOutputPathUrl = join(process.cwd(), outputPath);

await rename(fullInputPathUrl, fullOutputPathUrl);
console.log(green(`✅ Renamed ${bold(inputPath)} to ${bold(outputPath)}`));
