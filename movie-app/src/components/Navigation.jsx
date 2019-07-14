import React from "react"
import "./Navigation.css";
const Navigation = (props) =>{
    return(
        <header>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/explore">Explore</a></li>
            </ul>
        </header>
    );
}

export default Navigation;