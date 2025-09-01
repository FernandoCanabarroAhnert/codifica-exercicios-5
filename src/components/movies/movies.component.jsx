import './movies.styles.scss'
import { useEffect, useState } from 'react';
import MovieCard from '../movie-card/movie-card.component';
import Paginator from '../paginator/paginator.component';

const jwtToken = import.meta.env.VITE_JWT_TOKEN;

export default function Movies() {
    const [searchQuery, setSearchQuery] = useState('');
    const [pageResponse, setPageResponse] = useState({});

    const initialUrl = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + jwtToken
        }
    };

    useEffect(() => {
        searchMovies();
    }, []);

    const searchMovies = (selectedPage = 1) => {
        let searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=true&language=pt-BR&page=${selectedPage}`;
        if (searchQuery === '') {
            searchUrl = initialUrl + `&page=${selectedPage}`;
        }
        fetch(searchUrl, options)
            .then(res => res.json())
            .then(setPageResponse)
            .catch(err => console.error(err));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handlePageChange = (selectedPage) => {
        searchMovies(selectedPage);
    };
    const handleSearchQuerySubmit = (event) => {
        event.preventDefault();
        searchMovies();
    };

    return (
        <div className="movies">
            <form className='movies__form' onSubmit={handleSearchQuerySubmit}>
                <input className='movies__input' type="text" onChange={e => setSearchQuery(e.target.value)} placeholder='Nome do filme...' />
                <button className="movies__button" type="submit">
                    <img className='movies__search-icon' src="search.svg" alt="Pesquisar" title='Pesquisar' />
                </button>
            </form>
            <div className="movies__grid">
                {
                    pageResponse.results && pageResponse.results.map(movie => <MovieCard key={movie.id} movie={movie} />)
                }
            </div>
            <Paginator currentPage={pageResponse.page} totalPages={pageResponse.total_pages > 500 ? 500 : pageResponse.total_pages} onPageChange={handlePageChange} />
        </div>
    )

}