<template>
  <div :class="['app-root', isDark ? 'dark' : 'light']">

    <!-- Navbar -->
    <header class="navbar">
      <div class="navbar-brand">


      </div>

      <div class="navbar-right">
        <div class="live-badge">
          <span class="live-dot"></span>
          Canlı
        </div>
        <button class="theme-toggle" @click="isDark = !isDark" :title="isDark ? 'Aydınlık temaya geç' : 'Karanlık temaya geç'">
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Ana İçerik -->
    <main class="main-content">

      <!-- Şık Çerçeve (Dashboard Frame) -->
      <div class="dashboard-frame">

        <!-- Başlık Alanı -->
        <div class="page-header">
          <div class="page-title-block">
            <p class="page-eyebrow">Kripto Para Piyasası</p>
            <h1 class="page-title">Piyasa Özeti</h1>
            <p class="page-subtitle">İlk 50 kripto paranın anlık fiyatları</p>
          </div>

          <button
            @click="cryptoStore.fetchCryptos"
            :disabled="cryptoStore.isLoading"
            class="refresh-btn"
          >
            <svg
              :class="['refresh-icon', cryptoStore.isLoading ? 'spinning' : '']"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            {{ cryptoStore.isLoading ? 'Güncelleniyor' : 'Yenile' }}
          </button>
        </div>

        <!-- Skeleton Loader -->
        <div v-if="cryptoStore.isLoading" class="coin-grid">
          <div v-for="i in 12" :key="i" class="coin-card skeleton-card">
            <div class="skeleton-header">
              <div class="skeleton-circle"></div>
              <div class="skeleton-lines">
                <div class="skeleton-line w-half"></div>
                <div class="skeleton-line w-quarter"></div>
              </div>
            </div>
            <div class="skeleton-footer">
              <div class="skeleton-line w-three-quarter"></div>
              <div class="skeleton-pill"></div>
            </div>
          </div>
        </div>

        <!-- Hata Durumu -->
        <div v-else-if="cryptoStore.error" class="error-state">
          <div class="error-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <p class="error-title">Veri yüklenemedi</p>
          <p class="error-desc">{{ cryptoStore.error }}</p>
          <button @click="cryptoStore.fetchCryptos" class="error-retry">Tekrar dene</button>
        </div>

        <!-- Koin Grid -->
        <div v-else class="coin-grid">
          <div
            v-for="coin in cryptoStore.cryptos"
            :key="coin.id"
            class="coin-card"
          >
            <!-- Rank Badge -->
            <div class="rank-badge">#{{ coin.market_cap_rank }}</div>

            <!-- Koin Başlığı -->
            <div class="coin-header">
              <div class="coin-identity">
                <div class="coin-img-wrapper">
                  <img :src="coin.image" :alt="coin.name" class="coin-img" loading="lazy" />
                </div>
                <div class="coin-meta">
                  <h2 class="coin-name">{{ coin.name }}</h2>
                  <span class="coin-symbol">{{ coin.symbol }}</span>
                </div>
              </div>

              <!-- 24s Değişim -->
              <div
                class="change-badge"
                :class="coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <polyline v-if="coin.price_change_percentage_24h >= 0" points="18 15 12 9 6 15"/>
                  <polyline v-else points="6 9 12 15 18 9"/>
                </svg>
                {{ Math.abs(coin.price_change_percentage_24h ?? 0).toFixed(2) }}%
              </div>
            </div>

            <!-- Fiyat -->
            <div class="coin-price">${{ formatPrice(coin.current_price) }}</div>

            <!-- Piyasa Değeri -->
            <div class="coin-mcap">
              Piyasa değeri: <span>${{ formatMarketCap(coin.market_cap) }}</span>
            </div>

            <!-- Alt Çizgi Aksanı -->
            <div class="card-accent-line" :class="coin.price_change_percentage_24h >= 0 ? 'teal' : 'rose'"></div>
          </div>
        </div>

      </div> <!-- /dashboard-frame bitti -->
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCryptoStore } from './stores/useCryptoStore'

const cryptoStore = useCryptoStore()
const isDark = ref(true)

onMounted(() => {
  cryptoStore.fetchCryptos()
})

function formatPrice(price) {
  if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  if (price >= 1) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 })
}

function formatMarketCap(cap) {
  if (!cap) return '—'
  if (cap >= 1e12) return (cap / 1e12).toFixed(2) + 'T'
  if (cap >= 1e9) return (cap / 1e9).toFixed(2) + 'B'
  if (cap >= 1e6) return (cap / 1e6).toFixed(2) + 'M'
  return cap.toLocaleString('en-US')
}
</script>

<style>
/* ─── Global Reset (Kenar beyazlıklarını önler) ──── */
body {
  margin: 0;
  padding: 0;
  background-color: #0D0F14; /* Dark tema arka planına uyumlu başlatır */
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');

/* ─── CSS Variables ─────────────────────────────────── */
.app-root {
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  transition: background 0.3s ease, color 0.3s ease;
}

/* DARK THEME */
.dark {
  --bg: #0D0F14;
  --bg-frame: #12141D;
  --bg-card: #1A1D2B;
  --bg-card-hover: #202436;
  --border: rgba(255,255,255,0.07);
  --border-hover: rgba(108,99,255,0.35);
  --text-primary: #F0F2FF;
  --text-secondary: #7B82A0;
  --text-muted: #4A5070;
  --accent: #6C63FF;
  --accent-glow: rgba(108,99,255,0.15);
  --teal: #00D4AA;
  --teal-bg: rgba(0,212,170,0.08);
  --teal-text: #00D4AA;
  --rose: #FF4D6A;
  --rose-bg: rgba(255,77,106,0.08);
  --rose-text: #FF6B83;
  --navbar-bg: rgba(13,15,20,0.85);
  --shadow-frame: 0 12px 40px rgba(0,0,0,0.4);
  --shadow: 0 4px 24px rgba(0,0,0,0.2);
  --shadow-hover: 0 8px 40px rgba(0,0,0,0.4);
  --skeleton-base: #1C1F2E;
  --skeleton-shine: #242840;
  color: var(--text-primary);
  background: var(--bg);
}

/* LIGHT THEME */
.light {
  --bg: #F4F5FA;
  --bg-frame: #FFFFFF;
  --bg-card: #F9FAFF;
  --bg-card-hover: #FFFFFF;
  --border: rgba(0,0,0,0.07);
  --border-hover: rgba(108,99,255,0.3);
  --text-primary: #0D0F1E;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  --accent: #5B52FF;
  --accent-glow: rgba(91,82,255,0.1);
  --teal: #00B896;
  --teal-bg: rgba(0,184,150,0.08);
  --teal-text: #009E80;
  --rose: #E8304A;
  --rose-bg: rgba(232,48,74,0.07);
  --rose-text: #D42E46;
  --navbar-bg: rgba(255,255,255,0.9);
  --shadow-frame: 0 8px 30px rgba(0,0,0,0.05);
  --shadow: 0 2px 12px rgba(0,0,0,0.04);
  --shadow-hover: 0 6px 24px rgba(0,0,0,0.1);
  --skeleton-base: #E8EAF2;
  --skeleton-shine: #F0F2F9;
  color: var(--text-primary);
  background: var(--bg);
}

/* ─── Navbar ─────────────────────────────────────────── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 64px;
  background: var(--navbar-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}

.navbar-brand { display: flex; align-items: center; gap: 10px; }
.brand-icon { width: 36px; height: 36px; border-radius: 10px; background: var(--accent); display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 0 20px var(--accent-glow); }
.brand-name { font-size: 1.15rem; font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); }
.navbar-right { display: flex; align-items: center; gap: 12px; }
.live-badge { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 600; color: var(--teal-text); background: var(--teal-bg); padding: 4px 12px; border-radius: 100px; letter-spacing: 0.03em; }
.live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); animation: pulse-dot 2s infinite; }
@keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.7); } }

.theme-toggle { width: 38px; height: 38px; border-radius: 10px; border: 1px solid var(--border); background: transparent; color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.theme-toggle:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-glow); }

/* ─── Main ────────────────────────────────────────────── */
.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

/* ─── Dashboard Çerçevesi ─────────────────────────────── */
.dashboard-frame {
  background: var(--bg-frame);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: var(--shadow-frame);
  background-image: linear-gradient(135deg, rgba(255,255,255,0.02), transparent);
}

/* ─── Page Header ─────────────────────────────────────── */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  gap: 1rem;
}

.page-eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
.page-title { font-size: 2.2rem; font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: var(--text-primary); margin: 0 0 6px; }
.page-subtitle { font-size: 0.875rem; color: var(--text-secondary); margin: 0; font-weight: 500; }

.refresh-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 12px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text-secondary); font-size: 0.85rem; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.2s; white-space: nowrap; flex-shrink: 0; }
.refresh-btn:hover:not(:disabled) { color: var(--accent); border-color: var(--accent); background: var(--accent-glow); }
.refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.refresh-icon { transition: transform 0.3s; }
.spinning { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ─── Coin Grid ───────────────────────────────────────── */
.coin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.25rem; }

/* ─── Coin Card ───────────────────────────────────────── */
.coin-card { position: relative; background: var(--bg-card); border: 1px solid var(--border); border-radius: 18px; padding: 1.25rem; overflow: hidden; transition: all 0.25s ease; cursor: default; box-shadow: var(--shadow); }
.coin-card:hover { background: var(--bg-card-hover); border-color: var(--border-hover); transform: translateY(-3px); box-shadow: var(--shadow-hover); }

.rank-badge { position: absolute; top: 12px; right: 12px; font-size: 0.65rem; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: var(--text-muted); letter-spacing: 0.02em; }
.coin-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
.coin-identity { display: flex; align-items: center; gap: 10px; }
.coin-img-wrapper { width: 40px; height: 40px; border-radius: 50%; background: var(--border); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; }
.coin-img { width: 36px; height: 36px; object-fit: contain; transition: transform 0.3s ease; }
.coin-card:hover .coin-img { transform: scale(1.1); }
.coin-meta { display: flex; flex-direction: column; gap: 2px; }
.coin-name { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px; }
.coin-symbol { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; font-family: 'JetBrains Mono', monospace; }

/* Change Badge */
.change-badge { display: flex; align-items: center; gap: 3px; padding: 4px 8px; border-radius: 8px; font-size: 0.72rem; font-weight: 700; font-family: 'JetBrains Mono', monospace; flex-shrink: 0; }
.change-badge.positive { background: var(--teal-bg); color: var(--teal-text); }
.change-badge.negative { background: var(--rose-bg); color: var(--rose-text); }

/* Price */
.coin-price { font-family: 'JetBrains Mono', monospace; font-size: 1.3rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; margin-bottom: 6px; line-height: 1; }
.coin-mcap { font-size: 0.72rem; color: var(--text-muted); font-weight: 500; }
.coin-mcap span { color: var(--text-secondary); font-weight: 600; font-family: 'JetBrains Mono', monospace; }

/* Accent Line */
.card-accent-line { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; opacity: 0; transition: opacity 0.25s; }
.coin-card:hover .card-accent-line { opacity: 1; }
.card-accent-line.teal { background: linear-gradient(90deg, transparent, var(--teal), transparent); }
.card-accent-line.rose { background: linear-gradient(90deg, transparent, var(--rose), transparent); }

/* ─── Skeleton & Error ────────────────────────────────── */
.skeleton-card { pointer-events: none; }
.skeleton-header { display: flex; gap: 12px; align-items: center; margin-bottom: 1.2rem; }
.skeleton-circle { width: 40px; height: 40px; border-radius: 50%; background: var(--skeleton-base); flex-shrink: 0; animation: shimmer 1.5s ease-in-out infinite; }
.skeleton-lines { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.skeleton-line { height: 10px; border-radius: 5px; background: var(--skeleton-base); animation: shimmer 1.5s ease-in-out infinite; }
.w-half { width: 50%; } .w-quarter { width: 30%; } .w-three-quarter { width: 65%; }
.skeleton-footer { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.skeleton-pill { width: 52px; height: 24px; border-radius: 8px; background: var(--skeleton-base); animation: shimmer 1.5s ease-in-out infinite; }
@keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

.error-state { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 4rem 2rem; text-align: center; }
.error-icon { width: 56px; height: 56px; border-radius: 16px; background: var(--rose-bg); color: var(--rose-text); display: flex; align-items: center; justify-content: center; margin-bottom: 8px; }
.error-title { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.error-desc { font-size: 0.85rem; color: var(--text-secondary); margin: 0; }
.error-retry { margin-top: 8px; padding: 10px 24px; border-radius: 12px; border: 1px solid var(--rose); background: var(--rose-bg); color: var(--rose-text); font-size: 0.85rem; font-weight: 700; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.2s; }
.error-retry:hover { background: var(--rose); color: white; }

/* ─── Responsive ──────────────────────────────────────── */
@media (max-width: 768px) {
  .dashboard-frame { padding: 1.5rem; border-radius: 16px; }
}

@media (max-width: 640px) {
  .navbar { padding: 0 1rem; }
  .main-content { padding: 1.5rem 1rem; }
  .page-title { font-size: 1.7rem; }
  .page-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .refresh-btn { width: 100%; justify-content: center; }
  .coin-grid { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .coin-price { font-size: 1.05rem; }
  .coin-name { max-width: 90px; }
}

@media (max-width: 400px) {
  .coin-grid { grid-template-columns: 1fr; }
}
</style>
