import MoviesDAO from '../dao/moviesDAO.js'

export default class MoviesController {
// Define a static asynchronous method apiGetMovies for handling movie retrieval requests
    static async apiGetMovies(req, res, next) {
//Get the num of total moviesPerPage from the queryparameters, default to 20 if not provided
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20
// Get the num of total pages from the query parameters, default to 0 if not provided 
        const page = req.query.page ? parseInt(req.query.page) : 0

        let filters = {} 
 // If a 'rated' filter is provided in the query parameters, add it to the filters object
        if (req.query.rated) {
            filters.rated = req.query.rated
        }
// Otherwise, if a 'title' filter is provided, add it to the filters object
        else if (req.query.title) {
            filters.title = req.query.title
        }

//Call the getMovies method from MoviesDAO to fetch the movies based on filters, page, and moviesPerPage
        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({ 
            filters, 
            page, 
            moviesPerPage 
        })

 // Prepare the response object with the movies list, current page, filters, entries per page, and total results
        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }
        res.json(response)// Send the response as a JSON object
    }
}
