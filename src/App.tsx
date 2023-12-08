import './App.css'

// import MoviesResponse from './mock/movies.json'
import { Movies, Search } from './interfaces/interfaces';
import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import getMovies from './services/getMovies';
import debounce from 'just-debounce-it';



function App() {
  
  // const response: Movies = MoviesResponse
  // const movies = response.Search
  const [search, setSearch] = useState('')
  const [ , setError] = useState< string | null >(null)
  const [ errorForm, setErrorForm] = useState< string | null >(null)
  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState(false)
  const [movies, setMovies] = useState<Search[]>([])
  const previusSearch = useRef(search)
  const isFirstLoad = useRef(true)



  useEffect(() => {

    if(isFirstLoad.current){
      isFirstLoad.current = search === ''
      return
    }

    if(search === ''){
      setErrorForm('Debe introducir el nombre de una película')
      return
    }

    if(search.match(/^\d+/)){
      setErrorForm('No Debe comenzar por números')
      return
    }

    if(search.length < 3){
      setErrorForm('Debe tener más de 3 letras')
      return
    }

    setErrorForm(null)

    
  }, [search])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.Title.localeCompare(b.Title))
      : movies
  }, [sort, movies])

  const searchMovies = async({search}: {search: string}) => {

    if( search === previusSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previusSearch.current = search
      const data = await getMovies({ search })
      setMovies(data)
    } catch (e) {
      setError((e as Error).message)
    }
    finally {
      setLoading(false)
    }
    
  }

  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      console.log('search', search)
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
              (sortedMovies.length === 0)
              ? <p>No hay Movies ...</p>
              : (
              <ul className='containerMovie'>
              {
                sortedMovies.map( element => (
                <li key={element.imdbID} className='movie'> 
                  <h3>{element.Title} </h3>
                  <p> {element.Year} </p>
                  <img src={element.Poster} alt={element.Title} />
                </li>
                ))
              }
              </ul>
            )
          )
        }
      </main>
    </div>
  )
}

export default App
