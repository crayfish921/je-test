import { AspectRatio, Card, CircularProgress, Typography } from '@mui/joy'
import { useSignals } from '@preact/signals-react/runtime'
import { FC } from 'react'
import { movieDetailsLoading, selectedMovie } from '../../signals/movieSignals'

export const MovieDetails: FC = () => {
  useSignals()

  return (
    <Card>
      {movieDetailsLoading.value ? (
        <CircularProgress />
      ) : (
        <>
          <Typography level="h2">{selectedMovie.value?.Title}</Typography>
          <Typography level="body-lg">
            Released: {selectedMovie.value?.Released}
          </Typography>
          <Typography level="body-lg">
            Directed by: {selectedMovie.value?.Director}
          </Typography>
          <Typography level="body-lg">
            Actors: {selectedMovie.value?.Actors}
          </Typography>
          <Typography level="body-lg">
            IMDB score: <b>{selectedMovie.value?.imdbRating}</b>
          </Typography>
          <AspectRatio ratio="4/3" sx={{ maxWidth: 400 }}>
            {<img src={selectedMovie.value?.Poster} />}
          </AspectRatio>
          <Typography level="body-md">
            Plot: {selectedMovie.value?.Plot}
          </Typography>
        </>
      )}
    </Card>
  )
}
