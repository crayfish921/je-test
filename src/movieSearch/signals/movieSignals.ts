import { signal } from '@preact/signals-react'
import { Movie, MovieDetailed } from '../types'
import { LocalStorageKeys } from '../../values'

export const selectedMovie = signal<MovieDetailed | null>(null)

export const movieSearchOptions = signal<Movie[]>([])

export const moviesLoading = signal(false)

export const movieDetailsLoading = signal(false)

export const movieSearchHistory = signal<Movie[]>(
  JSON.parse(localStorage.getItem(LocalStorageKeys.SEARCH_HISTORY) || '[]')
)
