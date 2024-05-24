import axios from 'axios'

export const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://www.omdbapi.com',
  params: {
    apikey: '6297fc83'
  }
})
