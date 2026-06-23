import api from './api'

export const cryptoService = {
  // İlk 50 kripto parayı piyasa değerine göre sıralayıp çeken fonksiyon
  getMarkets() {
    return api.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 50,
        page: 1,
        sparkline: false
      }
    }).then(res => res.data)
  }
}
