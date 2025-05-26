import { NavLink } from "react-router";

export default function PageNotFound() {
    return (
        <div className="wrapper">
            <h1>404 Page not found...</h1>
            <NavLink to="/">Home</NavLink>
        </div>
    );
}