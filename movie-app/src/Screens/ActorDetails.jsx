import React from "react";
import axios from "axios";
import API_KEY from "../secret/secret";
import "./ActorDetails.css";
let baseURL="https://image.tmdb.org/t/p/w500";


class ActorDetails extends React.Component{
    state={
        filmography:{},
        actor_details:{}
    }

    getActorFilmography = async (id) =>{
        let newFilmography={};
        let response_flim = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`);
        let cast = response_flim.data.cast;
        cast.map(eachcast =>{
            let yr="Not Specified";
            if(eachcast.release_date)
            yr=new Date(eachcast.release_date).getFullYear();
            newFilmography[yr]=newFilmography[yr]?newFilmography[yr].concat({
                title:eachcast.title || eachcast.original_title,
                release_date:eachcast.release_date,
                character:eachcast.character
            }):[].concat({
                title:eachcast.title || eachcast.original_title,
                release_date:eachcast.release_date || "Not yet specified",
                character:eachcast.character || "Not yet specified"
            })
        });

        let response_actor = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`);
        console.log(response_actor.data.profile_path);
        let actor_details={
            name:response_actor.data.name,
            biography:response_actor.data.biography,
            birthday:response_actor.data.birthday,
            popularity:response_actor.data.popularity,
            poster_path:response_actor.data.profile_path
        }
        this.setState({
            actor_details,
            filmography:newFilmography
        });
    }
    componentDidMount(){
        this.getActorFilmography(this.props.match.params.id);
    }
    render(){
        return(
            <>
            <section className="actor-info">
                <div className="actor-image">
                {this.state.actor_details.poster_path &&<img src={baseURL+this.state.actor_details.poster_path} alt="actor-iamge"/>}
                </div>
                <div className="actor-gen-inf">
                    <div>
                        <div className="actor-name">{this.state.actor_details.name}</div>
                        <div className="ratings"><div><i class="fa fa-star"></i></div><div>{Math.floor(this.state.actor_details.popularity*10)}Stars</div></div>
                    </div>
                    <p>{this.state.actor_details.birthday && "Date of birth: "+this.state.actor_details.birthday}</p>
                    <p>{this.state.actor_details.biography}</p>
                </div>
            </section>
            <section className="filmography">
                {Object.keys(this.state.filmography).map(key_year=>{
                    return (
                        <>
                        <h1>{key_year}</h1>
                        <div className="year-film-container">
                            {this.state.filmography[key_year].map(film =>{
                                return(
                                    <div key={film.title} className="film">
                                        <div>Title:{film.title}</div>
                                        <div>Release:{film.release_date}</div>
                                        <div>Character:{film.character}</div>
                                    </div>
                                );
                            })}
                        </div>
                        </>
                    );
                })}
            </section>
            </>
        );
    }
}

export default ActorDetails;