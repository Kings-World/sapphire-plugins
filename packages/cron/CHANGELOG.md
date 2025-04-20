# Changelog

All notable changes to this project will be documented in this file.

# [@kingsworld/plugin-cron@3.0.4](https://github.com/Kings-World/sapphire-plugins/compare/@kingsworld/plugin-cron@3.0.3...@kingsworld/plugin-cron@3.0.4) - (2025-04-20)

## 📝 Documentation

- Replace mentions of cron with croner ([451ffce](https://github.com/Kings-World/sapphire-plugins/commit/451ffcef074c867600efee50b89e2175dbb1d0c5)) ([#103](https://github.com/Kings-World/sapphire-plugins/pull/103) by @SerenModz21)

# [@kingsworld/plugin-cron@3.0.3](https://github.com/Kings-World/sapphire-plugins/compare/@kingsworld/plugin-cron@3.0.2...@kingsworld/plugin-cron@3.0.3) - (2025-04-07)

## 🐛 Bug Fixes

- Correct optional methods type for protect and catch ([1a161dc](https://github.com/Kings-World/sapphire-plugins/commit/1a161dc3dd96fc1aa6a446cea3e042102d52b56c))

# [@kingsworld/plugin-cron@3.0.2](https://github.com/Kings-World/sapphire-plugins/compare/@kingsworld/plugin-cron@3.0.1...@kingsworld/plugin-cron@3.0.2) - (2025-04-07)

## 🐛 Bug Fixes

- The protect and catch methods cannot be abstract ([9e230ac](https://github.com/Kings-World/sapphire-plugins/commit/9e230ac9a4df3d76cf50981cd64927cec9f4611e))

# [@kingsworld/plugin-cron@3.0.1](https://github.com/Kings-World/sapphire-plugins/compare/@kingsworld/plugin-cron@2.1.1...@kingsworld/plugin-cron@3.0.1) - (2025-04-07)

## 🏠 Refactor

- **cron:** Replace the cron package with croner ([efd4ebb](https://github.com/Kings-World/sapphire-plugins/commit/efd4ebbd2e38f106bc322ffb962c5dcccb503c63)) ([#102](https://github.com/Kings-World/sapphire-plugins/pull/102) by @SerenModz21)
  - 💥 **BREAKING CHANGE:** The `cronTime` option has been replaced with `pattern`.
  - 💥 **BREAKING CHANGE:** The `timeZone` option has been replaced with `timezone`.
  - 💥 **BREAKING CHANGE:** The `cron` package has been replaced with `croner`.
  - 💥 **BREAKING CHANGE:** `container.cron.startAll()` and `container.cron.stopAll()` have been removed. Instead, you should pause and resume using the plugin's store.
  - 💥 **BREAKING CHANGE:** References to the word `cron` have been replaced with `cronTasks` for consistency. For example, `container.cron` is now `container.cronTasks` and `ClientOptions.cron` is now `ClientOptions.cronTasks`.
- Add the override keyword to the plugin methods ([a581de3](https://github.com/Kings-World/sapphire-plugins/commit/a581de3ae477d1f5fcff5e8376fb7c60fdae7daa))

# [@kingsworld/plugin-cron@2.1.1](https://github.com/Kings-World/sapphire-plugins/compare/@kingsworld/plugin-cron@2.1.0...@kingsworld/plugin-cron@2.1.1) - (2025-04-05)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies ([83f972e](https://github.com/Kings-World/sapphire-plugins/commit/83f972eda0f3db62cfab8916e5c444abc0247e10)) ([#97](https://github.com/Kings-World/sapphire-plugins/pull/97) by @renovate[bot])
- **deps:** Update dependency cron to v4 ([1550eff](https://github.com/Kings-World/sapphire-plugins/commit/1550eff0705e5430281291aeb0fe18a830186915)) ([#91](https://github.com/Kings-World/sapphire-plugins/pull/91) by @renovate[bot])
- **deps:** Update all non-major dependencies ([d5bd44f](https://github.com/Kings-World/sapphire-plugins/commit/d5bd44fbbe46d8aaa92b6157dccb9536debc66a0)) ([#80](https://github.com/Kings-World/sapphire-plugins/pull/80) by @renovate[bot])
- **deps:** Update all non-major dependencies ([fab1c9f](https://github.com/Kings-World/sapphire-plugins/commit/fab1c9f661175bc9c2fdfc7d9ab3af59d16acc6f)) ([#79](https://github.com/Kings-World/sapphire-plugins/pull/79) by @renovate[bot])
- **deps:** Update all non-major dependencies ([e44b9ef](https://github.com/Kings-World/sapphire-plugins/commit/e44b9efa5b164699dd4393188c38e6f3fdadcc3e)) ([#75](https://github.com/Kings-World/sapphire-plugins/pull/75) by @renovate[bot])

# [@kingsworld/plugin-cron@2.1.0](https://github.com/Kings-World/sapphire-plugins/compare/@kingsworld/plugin-cron@2.0.3...@kingsworld/plugin-cron@2.1.0) - (2024-10-03)

## 🚀 Features

- Format luxon timezones to their tz identifier ([47cb7ef](https://github.com/Kings-World/sapphire-plugins/commit/47cb7ef6970ae6255fe068f2f5cec1ace1ed8109)) ([#49](https://github.com/Kings-World/sapphire-plugins/pull/49) by @SerenModz21)

# [@kingsworld/plugin-cron@2.0.3](https://github.com/Kings-World/sapphire-plugins/compare/@kingsworld/plugin-cron@2.0.2...@kingsworld/plugin-cron@2.0.3) - (2024-09-27)

## 🐛 Bug Fixes

- **cron:** Correctly handle the sentry import ([c596f64](https://github.com/Kings-World/sapphire-plugins/commit/c596f64b2ae233ad2be5e02d3c68aa30329c88ce)) ([#47](https://github.com/Kings-World/sapphire-plugins/pull/47) by @SerenModz21)

# [@kingsworld/plugin-cron@2.0.2](https://github.com/Kings-World/sapphire-plugins/compare/@kingsworld/plugin-cron@2.0.1...@kingsworld/plugin-cron@2.0.2) - (2024-09-15)

## 🐛 Bug Fixes

- The ClientOptions#cron also needs to be partial ([f31d23a](https://github.com/Kings-World/sapphire-plugins/commit/f31d23a39187b2fc901c9d83723efafcd6942b4d)) ([#44](https://github.com/Kings-World/sapphire-plugins/pull/44) by @SerenModz21)

# [@kingsworld/plugin-cron@2.0.1](https://github.com/Kings-World/sapphire-plugins/compare/@kingsworld/plugin-cron@2.0.0...@kingsworld/plugin-cron@2.0.1) - (2024-09-15)

## 🐛 Bug Fixes

- Use the partial helper to make options optional ([fa10a8a](https://github.com/Kings-World/sapphire-plugins/commit/fa10a8a072354362a5816323b5c66ff6ace97b9d)) ([#43](https://github.com/Kings-World/sapphire-plugins/pull/43) by @SerenModz21)

# [@kingsworld/plugin-cron@2.0.0](https://github.com/Kings-World/sapphire-plugins/tree/@kingsworld/plugin-cron@2.0.0) - (2024-09-12)

## 🏠 Refactor

- Set option defaults and add more js docs ([179a2eb](https://github.com/Kings-World/sapphire-plugins/commit/179a2ebac74a3b2ded82500b8c8c6425f8af1e0f)) ([#35](https://github.com/Kings-World/sapphire-plugins/pull/35) by @SerenModz21)
- Improve the repo ([3546f66](https://github.com/Kings-World/sapphire-plugins/commit/3546f669d767764b622310dbf679ca8c86abfea6)) ([#26](https://github.com/Kings-World/sapphire-plugins/pull/26) by @Swiizyy)
- Switch to sapphire v5 changes ([3fcbf9e](https://github.com/Kings-World/sapphire-plugins/commit/3fcbf9ef0f541c4155875c38b406f5a1872f9de6))
  - 💥 **Signed-off-by:** Seren_Modz 21 <seren@kings-world.net>
- Update to sapphire v5 ([61e68a9](https://github.com/Kings-World/sapphire-plugins/commit/61e68a983eeb2d3c5334217930114a9cf08dafe7))
- Switch to a monorepo ([7646fbb](https://github.com/Kings-World/sapphire-plugins/commit/7646fbb4ace71e7d3e939a29b89c72d213da36ce))
  - 💥 **BREAKING CHANGE:** move to a monorepo

## 🐛 Bug Fixes

- **cron:** Correct the cliff jumper org ([b7ee600](https://github.com/Kings-World/sapphire-plugins/commit/b7ee6007cca0d372edc27997268ec45db14304ac))
- Use luxon's system default instead of utc ([b56bf6b](https://github.com/Kings-World/sapphire-plugins/commit/b56bf6b9889ddf3c46f069fdf93043f074a16462)) ([#38](https://github.com/Kings-World/sapphire-plugins/pull/38) by @SerenModz21)
- Use the default export and actually register the hook ([5e271bf](https://github.com/Kings-World/sapphire-plugins/commit/5e271bfceb335be3e709831c9fad46c05f75b309))
- Ensure cts file extensions in dist/cjs ([907123a](https://github.com/Kings-World/sapphire-plugins/commit/907123a017210d3acca81f3373cbe5a3c102261f))
- Move readme ([e1c1f2d](https://github.com/Kings-World/sapphire-plugins/commit/e1c1f2d2b0a087489364db49b783de243af63244))

## 📝 Documentation

- **cron:** Add public keyword for consistency ([7e098d9](https://github.com/Kings-World/sapphire-plugins/commit/7e098d99437ad4b671c4e559f3532ce33a51d5ee))
- **cron:** Fix plugin name ([bea107d](https://github.com/Kings-World/sapphire-plugins/commit/bea107d72fdb86f42845bfa51cd02e8c6c8690a3))
- **cron:** Improve readme ([ede60d2](https://github.com/Kings-World/sapphire-plugins/commit/ede60d209d13af296507407675543ad7c05c4410)) ([#27](https://github.com/Kings-World/sapphire-plugins/pull/27) by @Swiizyy)
- Improve the readme ([784b306](https://github.com/Kings-World/sapphire-plugins/commit/784b306295c815bfc824b0143dd8b3f98a705afc))
- Fix package misspelling in readme ([6106d42](https://github.com/Kings-World/sapphire-plugins/commit/6106d42f6c98f28e9abdec70628d128cbcffc5d1))
- Update context type in readme ([be0102e](https://github.com/Kings-World/sapphire-plugins/commit/be0102e816d7c711d0d531cd96eb0f9b64bab794))
- Fix the in spelling ([3f71cf9](https://github.com/Kings-World/sapphire-plugins/commit/3f71cf92f6c0b2c2d00fbe20ac35d362d9b84bb9))
- Fix plugin spelling ([6b395bd](https://github.com/Kings-World/sapphire-plugins/commit/6b395bd82affef3ae0be9aeb2653cc5b31ca339d))
- Fix incorrect word ([0149312](https://github.com/Kings-World/sapphire-plugins/commit/0149312285fd839ccbecd3f1f7ecfb39699ea97a))
- Finish contributing section and update repo name ([7b73668](https://github.com/Kings-World/sapphire-plugins/commit/7b7366865a376cf2e070359342505606e531b737))

## 🚀 Features

- Allow disabling sentry instrumention and import automatically ([935821f](https://github.com/Kings-World/sapphire-plugins/commit/935821f4ed990ef97c3beb58901dbe96281da020))
- Add optional support for sentry's cron & add jsdoc ([555b5ae](https://github.com/Kings-World/sapphire-plugins/commit/555b5ae47535b06f5730dacdf041d38b01deda52))
- Update dependencies and release 1.1.0 ([b1aead8](https://github.com/Kings-World/sapphire-plugins/commit/b1aead83ba6ebd781c4bde554a8a3a459f6415c9))

## 🪞 Styling

- Format readme ([7b1c49f](https://github.com/Kings-World/sapphire-plugins/commit/7b1c49fbfaa85f45264f3028da663fcfb87ef826))
- Format everything ([e7ba3e2](https://github.com/Kings-World/sapphire-plugins/commit/e7ba3e2810e80382c4bf4e95e8fdc3d3868aab95))

