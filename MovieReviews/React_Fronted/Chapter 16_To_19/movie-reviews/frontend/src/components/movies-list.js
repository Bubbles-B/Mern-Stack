import React, { useState, useEffect } from 'react'
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'

const MoviesList = props => {//Define the MoviesList functional component

    const [movies, setMovies] = useState([])//State to store the list of movies
    const [searchTitle, setSearchTitle] = useState("")//State to hold the search title input
    const [searchRating, setSearchRating] = useState("")//State to hold the selected rating for search
    const [ratings, setRatings] = useState(["All Ratings"])//State to store available ratings, initialized with "All Ratings"


    useEffect(() => {//useEffect runs side effects
        retrieveMovies()//Call the function to fetch movies when the component mounts
        retrieveRatings()//Call the function to fetch ratings when the component mounts
    }, [])//runs once

    const retrieveMovies = () => {//Function to fetch all movies
        MovieDataService.getAll()//Call the service method to get all movies
            .then(response => {//Handle the response
                console.log(response.data)//Log the response
                setMovies(response.data.movies) //Update the movies state with the retrieved movies
            })
            .catch(e => {
                console.log(e)
            })
    }

    const retrieveRatings = () => {
        MovieDataService.getRatings()
            .then(response => {
                console.log(response.data)
                //start with 'All ratings' if user doesn't specify any ratings
                setRatings(["All Ratings"].concat(response.data))
            })
            .catch(e => {
                console.log(e)
            })
    }

    const onChangeSearchTitle = e => {//Handler for title search input change
        const searchTitle = e.target.value//Get the value from the input field
        setSearchTitle(searchTitle); //Update the searchTitle state with the new value
    }

    const onChangeSearchRating = e => {
        const searchRating = e.target.value//Get the value from the dropdown
        setSearchRating(searchRating);
    }

    const find = (query, by) => {//function to search movies by a query
        MovieDataService.find(query, by)//Call the service method to find movies based on the query and criteria
            .then(response => {//Handle the successful response
                console.log(response.data)//Log the response
                setMovies(response.data.movies)//Update the movies state with the retrieved movies
            })
            .catch(e => {
                console.log(e)
            })
    }

    const findByTitle = () => {//Function to search movies by title
        find(searchTitle, "title")//Search for movies using the title entered by the user
    }

    const findByRating = () => {
        if (searchRating === "All Ratings") {//Check if "All Ratings" is selected
            retrieveMovies() //retrieve all movies
        }
        else {
            find(searchRating, "rated")//search for movies using the selected rating
        }
    }

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by title"
                                    value={searchTitle}
                                    onChange={onChangeSearchTitle}//Call handler on input change
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByTitle}//Call findByTitle function when clicked
                            >
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    //as lets you change what type of HTML element a component will be, while still keeping its features.
                                    as="select"//Dropdown for selecting ratings
                                    onChange={onChangeSearchRating}//Call handler on selection change
                                >
                                    {ratings.map(rating => {//Loop over available ratings to create options
                                        return (
                                            <option value={rating}>{rating}</option>//Unique key for each option
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByRating}//Call findByRating function when clicked
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <Row>
                    {movies.map((movie) => {//Loop over movies to create individual movie cards
                        return (
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img src={movie.poster + "/100px180"} />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>
                                            Rating: {movie.rated}
                                        </Card.Text>
                                        <Card.Text>{movie.plot}</Card.Text>
                                        <Link to={"/movies/" + movie._id} >View Reviews</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default MoviesList;