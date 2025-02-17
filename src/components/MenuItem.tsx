import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { IMenuItem } from "../interfaces/IMenuItem";

const MenuItem: React.FC<IMenuItem> = ({view, text, logout}) => {
    const navigate = useNavigate()
    
    const handleClick = () => {
        if(logout){
            logout()
            navigate("/")
        }
    }

    return (
        <li className="nav-item">
            {logout ? (
                <button className="nav-link btn btn-link" onClick={handleClick}>{text}</button>
            ) : (
                <Link className="nav-link" to={`/${view}`}>{text}</Link>
            )}
        </li>
    )
}

export default MenuItem
