import { Link } from "react-router-dom";
import "./Sectioncard.css"
function Sectioncard({movies}){
    return(<div>
    <div className="sectioncard">
   <Link to={`/movies/${movies.id}`}> <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="poster" width={"100%"} height={"250px"}/></Link>
     <h3><b>Title</b>:{movies.title}</h3>
     <h3><b>vote_average:</b>{movies.vote_average}</h3>
    </div>
    </div>)
}
export default Sectioncard;