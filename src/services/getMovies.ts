import { Movies } from "../interfaces/interfaces"

const API_KEY = '13ba57e3'
const URL_ENDPOINT = 'http://www.omdbapi.com/?apikey='

const getMovies = async ({search}: {search: string}) => {
      if( search === '') return null

    try {
        const resp = await fetch(`${URL_ENDPOINT}${API_KEY}&s=${search}`)
        const data: Movies = await resp.json()

        return [...data.Search]
    } catch (error) {
        throw new Error('Error buscando las películas')
    }

    
}

export default getMovies
