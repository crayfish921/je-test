import { Badge, Button, IconButton, Tooltip } from '@mui/joy'
import { FC, useState } from 'react'
import HistoryIcon from '@mui/icons-material/History'
import Close from '@mui/icons-material/Close'
import Copy from '@mui/icons-material/ContentCopy'
import { Popper } from '@mui/base/Popper'
import { SearchHistoryCard } from './styled/searchHistoryStyledComponents'
import { movieSearchHistory } from '../../signals/movieSignals'
import { useSignals } from '@preact/signals-react/runtime'

export const SearchHistory: FC = () => {
  useSignals()

  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget)
    setIsOpen(!isOpen)
  }

  const clearSearchHistory = () => {
    movieSearchHistory.value = []
    localStorage.clear()
    setIsOpen(false)
  }

  return (
    <>
      <Tooltip
        title={
          !movieSearchHistory.value.length ? 'No search history available' : ''
        }
      >
        <Badge size="sm" badgeContent={movieSearchHistory.value.length}>
          <IconButton
            disabled={!movieSearchHistory.value.length}
            variant="outlined"
            onClick={handleClick}
          >
            {!isOpen ? <HistoryIcon /> : <Close />}
          </IconButton>
        </Badge>
      </Tooltip>
      <Popper open={isOpen} anchorEl={anchor}>
        <SearchHistoryCard>
          {movieSearchHistory.value.map((movie) => (
            <div key={movie.imdbID + Math.random()}>
              <>{`${movie.Title} (${movie.Year})`}</>
              <Tooltip title="Copy movie title">
                <IconButton
                  onClick={() => navigator.clipboard.writeText(movie.Title)}
                >
                  <Copy />
                </IconButton>
              </Tooltip>
            </div>
          ))}

          <Button onClick={clearSearchHistory} color="warning">
            Clear history
          </Button>
        </SearchHistoryCard>
      </Popper>
    </>
  )
}
