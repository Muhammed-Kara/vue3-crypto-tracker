import axios from 'axios'

// Axios örneğini (instance) oluşturuyoruz
const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000, // 10 saniye içinde cevap gelmezse isteği zaman aşımına uğrat
})

// Hata yakalama (Interceptor) mekanizması
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Hatası:', error.response?.status || error.message)
    return Promise.reject(error)
  }
)

export default api
