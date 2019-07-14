import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./Screens/Home";
import Explore from "./Screens/Explore";
import ActorDetails from "./Screens/ActorDetails";
import MovieDetails from "./Screens/MovieDetails";
import Navigation from "./components/Navigation";
function App() {
  return (
    <div className="App">
      <Navigation/>
      <BrowserRouter>
        <Switch>
          <Route  exact path="/" component={Home}/>
          <Route  exact path="/person/:id" component={ActorDetails}/>
          <Route  exact path="/movie/:id" component={MovieDetails}/>
          <Route  exact path="/explore" component={Explore}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
