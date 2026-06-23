TR:Bu çalışma, küresel kripto para piyasasını anlık olarak izlemek, piyasa trendlerini analiz etmek ve dinamik verileri kullanıcı dostu bir arayüzle sunmak amacıyla geliştirilmiş modern bir web uygulamasıdır. Proje, veri yoğunluğu yüksek olan finansal platformlarda kullanıcı deneyimini en üst düzeyde tutmayı hedeflerken, minimalist ve kurumsal tasarım çizgilerinden ödün vermeden kurgulanmıştır.

Uygulama, piyasa değerine (Market Cap) göre sıralanmış en popüler ilk 50 kripto para biriminin verilerini merkezi bir API üzerinden asenkron olarak çeker. Listelenen her bir varlık için anlık fiyat, son 24 saatlik yüzde bazında fiyat değişimi ve toplam piyasa değeri gibi kritik finansal metrikleri gerçek zamanlıya yakın bir performansla son kullanıcıya sunar.


EN:This development is a modern web application designed to monitor the global cryptocurrency market in real time, analyze market trends, and present dynamic financial data through a user-friendly interface. The project aims to maximize user experience on data-intensive financial platforms while maintaining a minimalist and corporate design style.

The application asynchronously fetches real-time data from a centralized API for the top 50 cryptocurrencies ranked by market capitalization. For each listed asset, it delivers critical financial metrics—such as live price, 24-hour percentage price fluctuations, and total market capitalization—with near-instantaneous rendering performance.

# vue3-crypto-tracker

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

![Proje Görseli](https://github.com/Muhammed-Kara/vue3-crypto-tracker/blob/main/2.2.png?raw=true)


![Proje Görseli](https://github.com/Muhammed-Kara/vue3-crypto-tracker/blob/main/1.3.png?raw=true)
