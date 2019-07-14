import React from "react";
import Slider from "react-slick";
import MovieCard from "./MovieCard"; 
import axios from "axios";
import API_KEY from "../secret/secret";

class Carousel extends React.Component {
    state={
        movies:[],
        isModalOn:false
    };
    modalOpenHandler = (id) =>{
        console.log(id);
        this.setState({
            isModalOn:true
        });
    }
    modalCloseHandler = () =>{
        this.setState({
            isModalOn:false
        });
    }

    getTrendingMovies = async(type) =>{
        let url="";
        if(type==="trending"){
            url=`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US
            `;
        }else{
            url=`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US
            `;
        }
        let resp_genres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US
        `);
        let genres = resp_genres.data.genres;
        let movie_response = await axios.get(url);
        let movies_results = movie_response.data.results;
        let movies = movies_results.map(movie=>{
            let movie_genre=[];
            movie_genre=genres.reduce((genreArr,current)=>{
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
            movies
        });
    }
    componentDidMount(){
        this.getTrendingMovies(this.props.type);
    }
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };
    console.log(this);
    let DomEL= <div className="spinner"></div>;
    if(this.state.movies.length){
        DomEL = (
        <div className="carousel" style={{"width":"80%","margin":"auto","marginTop":"20px"}}>
            <Slider {...settings}>
                {this.state.movies.map( (movie) =>{
                    return <MovieCard open={this.modalOpenHandler} close={this.props.modalCloseHandler} {...movie} key={movie.id}/>
                })}
            </Slider>
            {this.state.isModalOn &&<div style={{"position":"absolute","top":"0","left":"0","background":"grey","height":"100vh","width":"100vw","opacity":"0.2"}} className="backdrop"></div>}
        </div>
        );
    }
    return DomEL;
  }
}

export default Carousel;