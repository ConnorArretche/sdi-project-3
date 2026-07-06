import { Link } from "react-router-dom";
function NotFound() {
return (
    <div>
        <h1>Sorry, we can't find the page you are looking for.</h1>
        <Link to="/">RETURN HOME</Link>
    </div>
)
}

export default NotFound;