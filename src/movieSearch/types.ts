export type Movie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export type MovieDetailed = Movie & {
  imdbRating: string
  Plot: string
  Country: string
  Released: string
  Actors: string
  Director: string
}
