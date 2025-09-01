import { useContext } from 'react';
import './movie-card.styles.scss';
import { FavoriteMoviesContext } from '../../contexts/favorite-movies.context';
import { formatNumber } from '../../utils/number.utils';

export default function MovieCard({ movie }) {
    const { favoriteMovies, handleFavoriteMovie } = useContext(FavoriteMoviesContext);

    const isMovieFavorited = favoriteMovies.some(favMovie => favMovie.id === movie.id);

    const handleFavoriteMovieClick = (event) => {
        event.stopPropagation();
        handleFavoriteMovie(movie);
    }

    const navigateToMovieDetails = (movieId) => {
        window.location.href = `/movies/${movieId}`;
    }

    return (
        <div className="movie-card" title={movie.title} onClick={() => navigateToMovieDetails(movie.id)}>
            <div className="movie-card__relative">
                <i className={isMovieFavorited ? "bi bi-heart-fill movie-card__favorite" : "bi bi-heart movie-card__favorite"} 
                    onClick={handleFavoriteMovieClick} 
                    title={isMovieFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}></i>
                <img className='movie-card__image' src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="movie-card__body">
                <h2 className='movie-card__title'>{movie.title}</h2>
                <div className="movie-card__row">
                    <div className="movie-card__item">
                        <i className="bi bi-star-fill movie-card__icon"></i>
                        <span>{formatNumber(movie.vote_average)}</span>
                    </div>
                    <div className="movie-card__item">
                        <i className="bi bi-eye movie-card__icon"></i>
                        <span>{formatNumber(movie.popularity)}K</span>
                    </div>
                </div>
            </div>
        </div>
    )
}