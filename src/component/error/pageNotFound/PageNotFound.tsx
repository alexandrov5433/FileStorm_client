import './pageNotFound.sass';

import { NavLink } from "react-router";
import { useAppSelector } from "../../../lib/redux/reduxTypedHooks";

export default function PageNotFound() {
    const user = useAppSelector(state => state.user);
    return (
        <div id="page-not-found-main-container" className="wrapper">
            <section className="info-container">
                <h1><span>404</span> Page not found...</h1>
                <p>The page you are looking for could not be found.</p>
                <p>Please check the URL or go back.</p>
                <div>
                    {
                        user ?
                            <NavLink to="/my-storage" className="custom-btn main-btn">My Storage</NavLink>
                            :
                            <>
                                <NavLink to="/account/login" className="custom-btn main-btn">Login</NavLink>
                                <NavLink to="/account/register" className="custom-btn main-btn">Register</NavLink>
                            </>
                    }
                </div>
            </section>
            <section className="image-container flex-col-strech-wrapper">
                <div className="image-wrapper">
                    <span className="available-cloud">
                        <i className="bi bi-cloud-fill"></i>
                    </span>
                    <span className="available-cloud">
                        <i className="bi bi-cloud-fill"></i>
                    </span>
                    <span className="available-cloud">
                        <i className="bi bi-cloud-fill"></i>
                    </span>
                    <span className="missing-cloud">
                        <i className="bi bi-cloud"></i>
                    </span>
                    <span className="available-cloud">
                        <i className="bi bi-cloud-fill"></i>
                    </span>
                </div>
            </section>
        </div>
    );
}