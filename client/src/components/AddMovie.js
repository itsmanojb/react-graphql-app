import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_MOVIES } from './MoviesList';

const GET_DIRECTORS = gql`
  query GetDirectors {
    directors {
      id
      name
      age
    }
  }
`;

const ADD_MOVIE = gql`
  mutation AddMovie($title: String!, $genre: String!, $directorIds: [ID!]!) {
    addMovie(title: $title, genre: $genre, directorIds: $directorIds) {
      id
      title
      genre
    }
  }
`;

const AddMovie = () => {
  const { loading, error, data } = useQuery(GET_DIRECTORS);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [directorId, setDirectorId] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [addMovie, { loading: mutationLoading, error: mutationError },] = useMutation(ADD_MOVIE);

  const submitForm = e => {
    e.preventDefault();
    setFormSubmitted(true);
    addMovie({
      variables: {
        title: title,
        genre: genre,
        directorIds: [directorId]
      },
      refetchQueries: [{
        query: GET_MOVIES
      }]
    });
    resetForm();
  }

  const resetForm = () => {
    setTitle('');
    setGenre('');
    setDirectorId('');
    setFormSubmitted(false);
  }


  return (
    <div className="add-movie">
      <form onSubmit={(e) => submitForm(e)}>
        <div className="form-group">
          <div className="form-input">
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Movie title" />
          </div>
          <div className="form-input">
            <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
          </div>
          <div className="form-input">
            <select id="directors" disabled={loading || error} defaultValue={directorId} onChange={(e) => setDirectorId(e.target.value)}>
              <option value="">Select Director(s)</option>
              {data && data.directors.map(
                ({ id, name }) => (<option key={id} value={id}>{name}</option>)
              )}
            </select>
          </div>
          <div className="form-input">
            <button type="submit" disabled={formSubmitted}>Add Movie</button>
          </div>
          <div className="form-input">
            {mutationLoading && <p>Please wait...</p>}
            {mutationError && <p>Error :( Please try again</p>}
          </div>
        </div>
      </form>
    </div>
  );

}

export default AddMovie;