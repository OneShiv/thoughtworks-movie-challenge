import React from "react";
import Carousel from "../components/Carousel";
import "./Home.css";
class Home extends React.Component{
    render(){
        return(
            <>
                <div className="movies-box">
                    <h1>Latest</h1>
                <Carousel type="now_playing"/>
                </div>
                <div className="movies-box">
                    <h1>Trending</h1>
                <Carousel type="trending"/>
                </div>
                <div className="movies-box">
                    <h1>Most Watched</h1>
                <Carousel type="popular"/>
                </div>
            </>
        )
    }
}

export default Home;