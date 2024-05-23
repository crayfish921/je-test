import { FC } from 'react'
import { SearchInput } from './components/searchInput/SearchInput'
import { Typography } from '@mui/joy'
import { MovieSearchContainer } from './styled/movieSearchStyledComponents'
import { SearchHistory } from './components/searchHistory/SearchHistory'
import { useSignals } from '@preact/signals-react/runtime'
import { MovieDetails } from './components/movieDetails/MovieDetails'
import { selectedMovie } from './signals/movieSignals'

export const MovieSearch: FC = () => {
  useSignals()
  return (
    <>
      <Typography level="h1">Lets find a movie</Typography>
      <MovieSearchContainer>
        <SearchInput />
        <SearchHistory />
        {selectedMovie.value ? <MovieDetails /> : null}
      </MovieSearchContainer>
    </>
  )
}
