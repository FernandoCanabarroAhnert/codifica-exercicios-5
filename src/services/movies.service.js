export default class MoviesService {

    static instance;

    constructor() {
        if (MoviesService.instance) {
            return MoviesService.instance;
        }
        this.jwtToken = import.meta.env.VITE_JWT_TOKEN;
        this.options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.jwtToken
            }
        };
        this.baseUrl = 'https://api.themoviedb.org/3/movie';
        MoviesService.instance = this;
    }

    static getInstance() {
        if (!MoviesService.instance) {
            MoviesService.instance = new MoviesService();
        }
        return MoviesService.instance;
    }

    findMovieById = async (movieId) => {
        return fetch(`${this.baseUrl}/${movieId}?language=pt-BR`, this.options)
            .then(res => res.json())
            .catch(err => console.error(err));
    }

    findAllMovies = async (searchQuery, page) => {
        const initialUrl = `${this.baseUrl}/popular?language=pt-BR`;
        let searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=true&language=pt-BR&page=${page}`;
        if (searchQuery === '') {
            searchUrl = initialUrl + `&page=${page}`;
        }
        return fetch(searchUrl, this.options)
            .then(res => res.json())
            .catch(err => console.error(err));
    }

    findSimilarMoviesById = async (movieId) => {
        return fetch(`${this.baseUrl}/${movieId}/similar?language=pt-BR`, this.options)
            .then(res => res.json())
            .catch(err => console.error(err));
    }

}