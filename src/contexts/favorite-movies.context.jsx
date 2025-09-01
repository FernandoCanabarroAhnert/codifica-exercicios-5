import { createContext, useEffect, useState } from "react";

export const FavoriteMoviesContext = createContext([]);

export function FavoriteMoviesProvider({ children }) {
    const [favoriteMovies, setFavoriteMovies] = useState(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        return storedFavorites;
    });

    useEffect(() => {
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    }, [favoriteMovies]);

    const handleFavoriteMovie = (movie) => {
        const isMovieFavorited = favoriteMovies.some(favMovie => favMovie.id === movie.id);
        if (!isMovieFavorited) {
            setFavoriteMovies(prev => [...prev, movie]);
        } else {
            setFavoriteMovies(prev => prev.filter(favMovie => favMovie.id !== movie.id));
        }
    }

    return (
        <FavoriteMoviesContext.Provider value={{ favoriteMovies, handleFavoriteMovie }}>
            {children}
        </FavoriteMoviesContext.Provider>
    )
}