import { defineStore } from 'pinia'
import { ref } from 'vue'
import { cryptoService } from '../services' // index.js sayesinde sadece klasör adını yazmak yetiyor

export const useCryptoStore = defineStore('crypto', () => {

  const cryptos = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetchCryptos = async () => {
    isLoading.value = true
    error.value = null

    try {

      const data = await cryptoService.getMarkets()
      cryptos.value = data // Gelen veriyi state'e atıyoruz
    } catch (err) {
      error.value = 'Piyasa verileri alınırken bir hata oluştu!'
      console.error('Store Hatası:', err)
    } finally {
      // İşlem bitince yükleniyor durumunu kapatıyoruz
      isLoading.value = false
    }
  }


  return {
    cryptos,
    isLoading,
    error,
    fetchCryptos
  }
})
