import './App.scss';
import './styles/reset.scss';
import Movies from './components/movies/movies.component'
import Layout from './components/layout/layout.component'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/movies" element={<Movies />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
