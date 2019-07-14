import React from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";
import API_KEY from "../secret/secret";
import MovieCard from "../components/MovieCard";
import "./MovieDetails.css";

let baseURL = "https://image.tmdb.org/t/p/w500";
class MovieDetails extends React.Component{
    state={
        movie:{},
        related_movies:[]
    }
    getAllMovieDataAndSetState = async (movie_id) =>{
        let movie_response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US&append_to_response=credits `);
        let title = movie_response.data.title;
        let id = movie_response.data.id;
        let poster_path = movie_response.data.poster_path;
        let ratings = Math.round(movie_response.data.vote_average/2);
        let overview = movie_response.data.overview;
        let genres = movie_response.data.genres.map(genre =>genre.name).join(",");
        let director ="";
        for ( let crew of movie_response.data.credits.crew){
            if(crew.job==="Director"){
                director=crew.name;
                break;
            }
        }
        let casts = movie_response.data.credits.cast.map(cast_el =>{
            return {name:cast_el.name,id:cast_el.id};
        });
        console.log(casts);
        let related_movies_resp = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=1`);

        let resp_genres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US
        `);
        let rel_genres = resp_genres.data.genres;
        let related_movies = related_movies_resp.data.results.slice(0,5).map(movie=>{
            let movie_genre=[];
            movie_genre=rel_genres.reduce((genreArr,current)=>{
                if(movie.genre_ids.includes(current.id)){
                    genreArr.push(current.name);
                }
                return genreArr;
            },[]);
            return{
                title:movie.title,
                poster_path:movie.poster_path,
                vote_average:movie.vote_average/2,
                liked:false,
                movie_genre,
                id:movie.id
            };
        });

        this.setState({
            movie:{
                title,
                id,
                genres,
                casts,
                director,
                overview,
                ratings,
                poster_path
            },
            related_movies:related_movies
        })

    }
    componentDidMount(){
        this.getAllMovieDataAndSetState(this.props.match.params.id);
    }
    render(){
        return(
            <div>
                <section className="movie-poster-main">
                    <img alt="poster-path" src={baseURL+this.state.movie.poster_path}/>
                    <button>Mark as favorite<i className="fa fa-heart"></i></button>
                </section>
                <section className="movie-info">
                    <section className="movie-summary">
                        <h1>{this.state.movie.title}</h1>
                        <p>{this.state.movie.overview}</p>
                    </section>
                    <section className="movie-add-info">
                        <div>
                            <div>Genre</div>
                            <div>{this.state.movie.genres}</div>
                        </div>
                        <div>
                            <div>Cast</div>
                            {this.state.movie.casts &&<div>{this.state.movie.casts.slice(0,6).map(cast=>(<a href={"/person/"+cast.id}>{cast.name},</a>))}</div>}
                        </div>
                        <div>
                            <div>Director</div>
                            <div>{this.state.movie.director}</div>
                        </div>
                        <div>
                            <div>Movie Rating</div>
                            <div><div><StarRatings
                            rating={this.state.movie.ratings}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor="black"/>
                        </div></div>
                        </div>
                    </section>
                </section>
                <section className="related-movies">
                    <h1>Related Movies</h1>
                    <div>
                        {this.state.related_movies.map(movie=>(<MovieCard  {...movie}/>))}
                    </div>
                </section>
            </div>
        )
    }
}

export default MovieDetails;