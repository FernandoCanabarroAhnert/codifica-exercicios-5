import './App.scss';
import './styles/reset.scss';
import Movies from './components/movies/movies.component'
import Layout from './components/layout/layout.component'
import Favorites from './components/favorites/favorites.components';
import { FavoriteMoviesProvider } from './contexts/favorite-movies.context';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <FavoriteMoviesProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </FavoriteMoviesProvider>
    </Router>
  )
}

export default App
