import './movies.styles.scss'
import { useEffect, useState } from 'react';
import Paginator from '../paginator/paginator.component';
import MoviesGrid from '../movies-grid/movies-grid.component';
import MoviesService from '../../services/movies.service';

export default function Movies() {
    const moviesService = MoviesService.getInstance();
    const [searchQuery, setSearchQuery] = useState('');
    const [pageResponse, setPageResponse] = useState({});

    useEffect(() => {
        moviesService.findAllMovies(searchQuery, 1).then(setPageResponse);
    }, []);

    const searchMovies = (selectedPage = 1) => {
        moviesService.findAllMovies(searchQuery, selectedPage).then(setPageResponse);
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
            <MoviesGrid movies={pageResponse.results} />
            <Paginator currentPage={pageResponse.page} totalPages={pageResponse.total_pages > 500 ? 500 : pageResponse.total_pages} onPageChange={handlePageChange} />
        </div>
    )

}