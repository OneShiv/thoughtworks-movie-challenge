import StarRatings from "react-star-ratings";
import React,{useState} from "react";
import "./MovieCard.css";
let baseURL="https://image.tmdb.org/t/p/w500";
const MovieCard  = (props) =>{
    let [state,setState] = useState({
        liked:props.liked
    });
    const likeHandler = () =>{
        setState(()=>({
            liked:!state.liked
        }))
    }
    return(
        <div className="movie-card" onClick={()=>{
            props.open(props.id);
        }}>
            <div className="movie-poster">
                <img src={baseURL+props.poster_path} alt="320*170"/>
            </div>
            <div className="movie-short-info">
                <div>
                    <div className="name-like">
                        <div className="movie_title">{props.title}</div>
                        <div className="movie_like"><i style={{"color":state.liked?"red":"grey"}} onClick={likeHandler} className="fa fa-heart fa-1x"></i></div>
                    </div>
                    <div className="genres">
                        {props.movie_genre.join(",")}
                    </div>
                    <div className="rating-link">
                        <div><StarRatings
                            rating={props.vote_average}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="black"/>
                        </div>
                        <div><a href={"/movie/"+props.id}>Show more</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;
