import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoviesService from "../../services/movies.service";
import { Link } from "react-router-dom";
import "./movie-details.styles.scss";
import '../../styles/global.scss'
import { FavoriteMoviesContext } from "../../contexts/favorite-movies.context";
import MoviesGrid from '../movies-grid/movies-grid.component';
import { formatDate } from '../../utils/date.utils';
import { formatNumber } from '../../utils/number.utils';

export default function MovieDetails() {
    const moviesService = MoviesService.getInstance();
    const [movie, setMovie] = useState();
    const [similarMovies, setSimilarMovies] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        moviesService.findMovieById(movieId).then(setMovie);
        moviesService.findSimilarMoviesById(movieId).then(data => setSimilarMovies(data.results));
    }, []);

    const { favoriteMovies, handleFavoriteMovie } = useContext(FavoriteMoviesContext);
    const isMovieFavorited = movie && favoriteMovies.some(favMovie => favMovie.id === movie.id);
    const handleFavoriteMovieClick = (event) => {
        event.stopPropagation();
        handleFavoriteMovie(movie);
    }

    return (
        movie && (
            <div className="movie-details">
                <section className="movie-details__main">
                    <img className="movie-details__image" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                    <a className="movie-details__back" href='/' title="Voltar">
                        <i className="bi bi-arrow-left movie-details__icon"></i>
                    </a>
                    <div className="movie-details__container container">
                        <h1 className="movie-details__title">{movie.title}</h1>
                        {
                            movie.tagline && <h3 className="movie-details__tagline">{movie.tagline}</h3>
                        }
                        {
                            movie.overview && <p className="movie-details__sinopse">{movie.overview}</p>
                        }
                        <div className="movie-details__row">
                            <Link className="movie-details__watch" to={movie.homepage}>
                                <i className="bi bi-play-fill"></i>
                                Assistir agora
                            </Link>
                            <i className={isMovieFavorited ? "bi bi-heart-fill movie-details__favorite" : "bi bi-heart movie-details__favorite"}
                                onClick={handleFavoriteMovieClick}
                                title={isMovieFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}></i>
                            <div className="movie-details__highlight">
                                <i className="bi bi-star-fill movie-card__icon"></i>
                                <span>{formatNumber(movie.vote_average)}</span>
                            </div>
                            <div className="movie-details__highlight">
                                <i className="bi bi-eye movie-card__icon"></i>
                                <span>{formatNumber(movie.popularity)}K</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="movie-details__infos">
                    <div className="container">
                        <h2 className="movie-details__subtopic">Informações</h2>
                        <div className="movie-details__grid">
                            <div className="movie-details__card">
                                <div className="movie-details__item">
                                    <span className="movie-details__label">Data de Lançamento</span>
                                    <span className="movie-details__value">{formatDate(movie.release_date)}</span>
                                </div>
                                <div className="movie-details__item">
                                    <span className="movie-details__label">Duração</span>
                                    <span className="movie-details__value">{movie.runtime} min</span>
                                </div>
                                <div className="movie-details__item">
                                    <span className="movie-details__label">Gênero</span>
                                    <span className="movie-details__value">{movie.genres.map(genre => genre.name).join(', ')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="movie-details__related">
                    <div className="container">
                        <h2 className="movie-details__subtopic">Filmes Relacionados</h2>
                        <MoviesGrid movies={similarMovies.slice(0, 8)} />
                    </div>
                </section>
            </div>
        )
    )
}