import { Outlet, Link } from "react-router-dom"
import { useContext } from "react";
import { SettingsContext } from './SettingsContext'
import './PageHeader.css'

function PageHeader() {
    const {theme} = useContext(SettingsContext)
    return(
        <div className={`nav-box ${theme === 'dark' ? 'dark' : ''}`}>
            <nav className="nav-bar">
                <h1 className="title"><Link className="link" to="/">MyBank</Link></h1>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="transactions">Transactions</Link>
                <Link className="link" to="/settings">Settings</Link>
            </nav>
            <Outlet/>
        </div>
    )
}

export default PageHeader;