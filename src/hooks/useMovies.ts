import { useCallback, useMemo, useRef, useState } from "react"
import { Search } from "../interfaces/interfaces"
import getMovies from "../services/getMovies"



const useMovies = ({ search, sort }: { search: string, sort: boolean}) => {
    const [ , setError] = useState< string | null >(null)
    const [loading, setLoading] = useState(false)
    const [movies, setMovies] = useState<Search[]>([])
    const previusSearch = useRef(search)
    

    const searchMovies = useCallback(async({search}: {search: string}) => {
  
      if( search === previusSearch.current) return
  
      try {
        setLoading(true)
        setError(null)
        previusSearch.current = search
        const data = await getMovies({ search })
        setMovies(data ?? [])
      } catch (e) {
        setError((e as Error).message)
      }
      finally {
        setLoading(false)
      }
      
    }, [])

    const sortedMovies = useMemo(() => {
        return sort
          ? [...movies].sort((a, b) => a.Title.localeCompare(b.Title))
          : movies
      }, [sort, movies])


      return { loading, movies: sortedMovies, searchMovies}
}

export default useMovies
