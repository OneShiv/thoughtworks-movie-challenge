import React from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import API_KEY from "../secret/secret";
import "./Explore.css";

class Explore extends React.Component{
    state={
        searchValue:"",
        searchResults:[],
    }
    searchResults = async () =>{
        let resp_genres=[];
        if(!this.state.genres){
            resp_genres= await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US
        `);
        }else{
            resp_genres=this.state.resp_genres; 
        }
        let genres = resp_genres.data.genres;
        if(this.state.searchResults!==""){
            let movieRes = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${this.state.searchValue}&page=1&include_adult=false`);
            let movies = movieRes.data.results.map(movie =>{
                let movie_genre=[];
                movie_genre=genres.reduce((genreArr,current)=>{
                    if(movie.genre_ids.includes(current.id)){
                        genreArr.push(current.name);
                    }
                    return genreArr;
                 },[]);
                return{
                    title:movie.title || movie.original_name,
                    poster_path:movie.poster_path,
                    vote_average:movie.vote_average/2,
                    liked:false,
                    movie_genre,
                    id:movie.id
                };
            });
            this.setState({
                searchResults:movies
            });
        }


    }
    inputHandler = (e) =>{
        this.setState({
            ...this.state,
            searchValue:e.target.value
        });
    }
    render(){
        return(
        <div className="explore">
        <section className="search rating-slider">
            <div>
                <div>
                <input type="text" value={this.state.searchValue} placeholder={"search movie,genres, artists..."}
                onChange={(e)=>this.inputHandler(e)}/>
                <span onClick={this.searchResults}><i className="fa fa-search" aria-hidden="true"></i></span>
                </div>
                <div>
                    <div className="outer-container">
                        <div className="innerSlider">Slider will come here</div>
                    </div>
                </div>
            </div>
        </section>
        <section className="movie_results">
            <h1>Results</h1>
            {this.state.searchResults.map(movie=>(<MovieCard {...movie} key={movie.id}/>))}
        </section>
        </div>
        )
    }
}

export default Explore