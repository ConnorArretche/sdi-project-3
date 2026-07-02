import { Outlet, Link } from "react-router-dom"

function PageHeader() {
    return(
        <div className="nav-box">
            <nav className="nav-bar">
                <h1 className="title"><Link className="link" to="/">Bank</Link></h1>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="transactions">Transactions</Link>
            </nav>
            <Outlet/>
        </div>
    )
}

export default PageHeader;