# Sparebeat_extensions

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/fjlmjjmfiiafghpnpegalcdfnclepakp?style=for-the-badge&logo=googlechrome&logoColor=white&label=Chrome%20Web%20Store)](https://chromewebstore.google.com/detail/sparebeat-extensions/fjlmjjmfiiafghpnpegalcdfnclepakp?hl=ja)
[![Firefox Add-ons](https://img.shields.io/amo/v/sparebeat-extensions?style=for-the-badge&logo=firefox&logoColor=white&label=Firefox%20Add-ons)](https://addons.mozilla.org/ja/firefox/addon/sparebeat-extensions/)

## How To Build

### Requirements
- Node.js >= 22
- pnpm

### Build Steps
1. Run `pnpm install --frozen-lockfile`.
2. Run `pnpm run build:{target}`. (replace `{target}` to `chrome`, `firefox` or `all`.) 
3. The output will be a `package-x-x-x.zip` file in the current directory.

## Directory Structure
- `extension`: The main source code of the extension.
- `scripts`: Build and packaging utilities.