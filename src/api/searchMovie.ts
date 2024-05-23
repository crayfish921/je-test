import { apiInstance } from './base'
import { debounce } from '../utils'
import { AxiosResponse } from 'axios'
import {
  movieDetailsLoading,
  movieSearchOptions,
  moviesLoading
} from '../movieSearch/signals/movieSignals'
import { Movie, MovieDetailed } from '../movieSearch/types'

export const searchMovie = debounce((text: string) => {
  moviesLoading.value = true
  apiInstance
    .get<any, AxiosResponse<{ Search: Movie[] }, any>>('', {
      params: {
        s: text
      }
    })
    .then((res) => {
      if (Array.isArray(res.data.Search)) {
        movieSearchOptions.value = res.data.Search
      }
    })
    .finally(() => {
      moviesLoading.value = false
    })
})

export const searchMovieByTitleAndYear = (title: string, year: string) => {
  movieDetailsLoading.value = true
  return apiInstance.get<any, AxiosResponse<MovieDetailed, any>>('', {
    params: {
      t: title,
      y: year
    }
  })
}
