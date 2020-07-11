import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ALL_DIRECTORS = gql`
  {
    directors {
      id
      name
      age
    }
  }
`;

const AddMovie = () => {
  const { loading, error, data } = useQuery(ALL_DIRECTORS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  // return data.movies.map(({ id, title, genre, directors }) => (
  //   <div className="movie-card" key={id}>
  //     <div className="card-header">
  //       <h3>{title}</h3>
  //       <p>{genre}</p>
  //     </div>
  //     <div className="card-content">
  //       <p>Directors:</p>
  //       <ul>
  //         {directors.map((director, index) => (
  //           <li key={index}>{director.name}, {director.age}</li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // ));

  return (
    <div className="add-movie">
      <form action="">
        <div className="form-group">
          <div className="form-input">
            <input type="text" id="title" placeholder="Movie title" />
          </div>
          <div className="form-input">
            <input type="text" id="genre" placeholder="Genre" />
          </div>
          <div className="form-input">
            <select id="directors" disabled={loading || error}>
              <option value="">Select Director(s)</option>
              {data && data.directors.map(
                ({ id, name }, index) => (<option key={index} value={id}>{name}</option>)
              )}
            </select>
          </div>
          <div className="form-input">
            <button type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
  );

}

export default AddMovie;