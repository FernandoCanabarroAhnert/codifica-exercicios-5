import { NavLink } from "react-router-dom";
import './header.styles.scss';

export default function Header() {
    return (
        <header className="header">
            <div className="container header__container">
                <img src="logo.png" alt="Logo" className="header__logo" />
                <div className="header__nav">
                    <ul className="header__list">
                        <li>
                            <NavLink to="/movies" className={({ isActive }) => (isActive ? 'header__link header__link--active' : 'header__link')}>Filmes</NavLink>
                        </li>
                        <li>
                            <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'header__link header__link--active' : 'header__link')}>Favoritos</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="header__space"></div>
            </div>
        </header>
    )
}