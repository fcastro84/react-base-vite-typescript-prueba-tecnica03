import './App.css'

// import MoviesResponse from './mock/movies.json'
import { ChangeEvent, FormEvent, useCallback, useState} from 'react';
import debounce from 'just-debounce-it';
import useSearch from './hooks/useSearch';
import useMovies from './hooks/useMovies';
import Movies from './components/Movies';


function App() {
  
  const [sort, setSort] = useState(false)
  const { search, errorForm, setSearch } = useSearch()
  const { loading, movies, searchMovies} = useMovies({ search, sort })
  
  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      searchMovies({ search })
    }, 300)
    , [searchMovies]
  )
  
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      searchMovies({search})
      
  }

  const handleChange = ( evt: ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value)
      debouncedGetMovies(evt.target.value)
  }

  const handleSort = () => {
    setSort(!sort)
}


  return (
    <div className='page'>
      <header>
        <h1>Prueba técnica: Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="movie" placeholder='Nombre de la película' onChange={handleChange} />
          <input type="checkbox" name="sort" onChange={handleSort} checked={sort}/>
          <button>Buscar</button>
        </form>
        {errorForm && <p style={{color: 'red', textAlign: 'center'}}> <b> {errorForm} </b></p>}
      </header>
      <main>
        {
          loading 
          ? (<span style={{color: 'red', fontSize: '5rem'}}> Cargando .... </span>)
          : (
             <Movies movies={movies} />
          )
        }
      </main>
    </div>
  )
}

export default App
