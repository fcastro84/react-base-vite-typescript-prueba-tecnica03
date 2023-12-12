import { useEffect, useRef, useState } from "react"


const useSearch = () => {

    // const response: Movies = MoviesResponse
  // const movies = response.Search
    const [search, setSearch] = useState('')
    const [ errorForm, setErrorForm] = useState< string | null >(null)
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

      return { search, errorForm, setSearch }
}

export default useSearch
