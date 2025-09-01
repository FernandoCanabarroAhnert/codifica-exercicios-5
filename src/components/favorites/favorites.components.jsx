import { useContext } from "react";
import { FavoriteMoviesContext } from "../../contexts/favorite-movies.context";
import MovieGrid from '../movies-grid/movies-grid.component';
import './favorites.styles.scss';

export default function Favorites() {
    const { favoriteMovies } = useContext(FavoriteMoviesContext);
    return (
        <div className="favorites">
            <MovieGrid movies={favoriteMovies} />
        </div>
    )

}