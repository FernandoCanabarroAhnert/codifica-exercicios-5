import Header from "../header/header.component"
import { Outlet } from "react-router-dom"
import './layout.styles.scss'

export default function Layout() {
    return (
        <div className="layout">
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}