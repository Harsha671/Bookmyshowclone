import React, { useState,useEffect } from "react";
import "./Section.css";
import getMovies from "../../service.js/service";
import Sectioncard from "./Sectioncard";
function Section(){
    const [movie,setMovie]=useState([]);
  useEffect(()=>{
    var movies1 =  getMovies()
    movies1.then((res)=>{
    console.log(res.data.results)
    setMovie(res.data.results)
     }).catch((err)=>{
   console.log(err)
     })
  },[])
    return(<div>
      <div className="section">
        <h1>Treading Movies</h1>
        <div className="section-movies">
     {
        movie.map((movies,i)=>{
            return(
                <Sectioncard  key ={i} movies ={movies}/>
            )
        })
     }
        </div>
      </div>
    </div>)
}
export default Section;
