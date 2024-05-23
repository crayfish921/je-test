import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  CircularProgress
} from '@mui/joy'
import { FC } from 'react'
import {
  searchMovie,
  searchMovieByTitleAndYear
} from '../../../api/searchMovie'
import { Movie } from '../../types'
import {
  movieDetailsLoading,
  movieSearchHistory,
  movieSearchOptions,
  moviesLoading,
  selectedMovie
} from '../../signals/movieSignals'
import { useSignals } from '@preact/signals-react/runtime'
import LiveTv from '@mui/icons-material/LiveTv'
import { addItemToArrayAndMaintainItemCount } from '../../../utils'
import { LocalStorageKeys } from '../../../values'
import { batch } from '@preact/signals-react'

export const SearchInput: FC = () => {
  useSignals()

  const handleChange = (
    _: React.SyntheticEvent,
    value: Movie | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason === 'clear') {
      selectedMovie.value = null
      movieSearchOptions.value = []
    }
    if (value) {
      batch(async () => {
        selectedMovie.value = await (
          await searchMovieByTitleAndYear(value.Title, value.Year)
        ).data

        movieDetailsLoading.value = false
        movieSearchHistory.value = addItemToArrayAndMaintainItemCount(
          value,
          movieSearchHistory.value
        )
      })

      localStorage.setItem(
        LocalStorageKeys.SEARCH_HISTORY,
        JSON.stringify(movieSearchHistory.value)
      )
    }
  }

  const handleBlur = () => {
    movieSearchOptions.value = []
  }

  const handleInputChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason === 'input' && value.length > 0) {
      searchMovie(value)
    }
  }

  return (
    <>
      <Autocomplete
        variant="outlined"
        onBlur={handleBlur}
        startDecorator={<LiveTv />}
        isOptionEqualToValue={(option, value) => option.imdbID === value.imdbID}
        onChange={handleChange}
        value={selectedMovie.value}
        onInputChange={handleInputChange}
        options={movieSearchOptions.value}
        loading={moviesLoading.value}
        getOptionLabel={(option) => `${option.Title} (${option.Year})`}
        getOptionKey={(option) => option.imdbID}
        forcePopupIcon={false}
        placeholder="Input movie title"
        endDecorator={
          moviesLoading.value ? (
            <CircularProgress
              size="sm"
              sx={{ bgcolor: 'background.surface' }}
            />
          ) : null
        }
      />
    </>
  )
}
