import StarRatings from "react-star-ratings";
import React from "react";

const MovieCard  = (props) =>{
    return(
        <div className="movie-card">
            <div className="movie-poster">
                <img src={""} alt="320*170"/>
            </div>
            <div className="movie-short-info">
                <div>
                    <div className="name-like">
                        <div className="movie_title">Title1</div>
                        <div><i class="fa fa-heart fa-1x"></i></div>
                    </div>
                    <div className="genres">
                        adventure, action
                    </div>
                    <div className="rating-link">
                        <div><StarRatings
                            rating={2.403}
                            starDimension="20px"
                            starSpacing="5px"/>
                        </div>
                        <div><a herf={"/movie/"+1}>Show more ..</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;