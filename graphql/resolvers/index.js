const Movie = require('../../models/movie');
const Director = require('../../models/director');

const director = directorId => {
  return Director.findById(directorId)
  .then(user => {
      return {
          ...user._doc,
          movies: movies.bind(this, user.movies)
      }
  })
  .catch(err => {
      throw err;
  })
}

const movies = movieIds => {
  return Movie.find({ _id: { $in: movieIds } })
  .then(movies => {
      return movies.map(movie => {
          return { 
              ...movie._doc, 
              director: director.bind(this, movie.director)
          }
      })
  })
  .catch(err => {
      throw err;
  })
}

module.exports = {
  movies: async () => {
      try {
          const movies = await Movie.find();
          return movies.map(movie => {
              return { 
                  ...movie._doc,
                  director: director.bind(this, movie._doc.director)
              };
          });
      }
      catch (err) {
          console.log(err);
          throw err;
      }
  },
  addMovie: args => {
      const movie = new Movie({
          title: args.movie.title,
          year: args.movie.year,
          director: '5d4ede7be361ba051fcafb45'
      })

      return movie
      .save()
      .then(result => {
          addedMovie = { ...result._doc, director: director.bind(this, result._doc.director) };
          return Director.findById('5d4ede7be361ba051fcafb45');
      })
      .then(director => {
          if(!director) {
              throw new Error('Director doesn\'t Exist');
          }
          director.movies.push(movie);
          return director.save();
      })
      .then(() => {
          return addedMovie;
      })
      .catch(err => {
          console.log(err);
          throw err;
      })
  },
  addDirector: async args => {
      const directorExists = await Director.findOne({ name: args.director.name });
      if (directorExists) {
          throw new Error(`Director ${args.director.name} already exists`);
      }
      else {
          const director = new Director({
              name: args.director.name,
              birthday: new Date(args.director.birthday),
          });
          return director.save().then(result => {
              return { ...result._doc };
          }).catch(err => {
              console.log(err);
              throw err;
          });
      }

  } 
}