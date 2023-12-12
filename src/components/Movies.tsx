import { Search } from "../interfaces/interfaces"


const EmptyMovies = () => {
    return (<p>No hay Movies ...</p>)
    
}

const ListMovies = ({ movies }: { movies: Search[]}) => {

  return (
    <ul className='containerMovie'>
              {
                movies.map( element => (
                <li key={element.imdbID} className='movie'> 
                  <h3>{element.Title} </h3>
                  <p> {element.Year} </p>
                  <img src={element.Poster} alt={element.Title} />
                </li>
                ))
              }
    </ul>
  )
}


const Movies = ( { movies }: { movies: Search[]} ) => {

  return (
    <>{
      
      (movies.length === 0)
              ? <EmptyMovies />
              : <ListMovies movies={movies} />
    }
    </>
  )
}

export default Movies


