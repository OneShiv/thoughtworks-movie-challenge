import React from 'react';
import './App.css';
import {Route, Switch} from "react-router";
import MovieCard from "./components/MovieCard";
function App() {
  return (
    <div className="App">
      <MovieCard/>
      {/* <Switch>
        <Route path="/" component={}/>
        <Route path="/person/:id" component={}/>
        <Route path="/movie/:id" component={}/>
        <Route path="/explore" component={}/>
      </Switch> */}
    </div>
  );
}

export default App;
