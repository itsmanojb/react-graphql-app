import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_MOVIES = gql`
  query GetMovies {
    movies{
      id
      title
      genre
      directors{
        name
        age
      }
    }
  }
`;

const MoviesList = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.movies.map(({ id, title, genre, directors }) => (
    <div className="movie-card" key={id}>
      <div className="card-header">
        <h3>{title}</h3>
        <p>{genre}</p>
      </div>
      <div className="card-content">
        <p>Directors:</p>
        <ul>
          {directors.map((director, index) => (
            <li key={index}>{director.name}, {director.age}</li>
          ))}
        </ul>
      </div>
    </div>
  ));

}

export default MoviesList;