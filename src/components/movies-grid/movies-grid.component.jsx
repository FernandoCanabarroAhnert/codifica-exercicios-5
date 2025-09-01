import MovieCard from "../movie-card/movie-card.component";
import './movies-grid.styles.scss'

export default function MoviesGrid({ movies }) {
    return (
        <div className="movies-grid">
            {
                movies && movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
            }
        </div>
    )
}