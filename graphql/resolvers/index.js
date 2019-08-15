const Movie = require('../../models/movie');
const Director = require('../../models/director');

const director = async directorId => {
  try {
    const director = await Director.findById(directorId);
    return {
        ...director._doc,
        birthday: new Date(director._doc.birthday).toISOString(),
        movies: movies.bind(this, director.movies)
    }
  } catch (error) {
    throw err;
  }
}

const movies = async movieIds => {
  try {
    const movies = await Movie.find({ _id: { $in: movieIds } })
    movies.map(movie => {
        return { 
            ...movie._doc, 
            director: director.bind(this, movie.director)
        }
    });
    return movies;
  } catch (error) {
    throw error;
  }
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
  addMovie: async args => {

    const movie = new Movie({
      title: args.movie.title,
      year: args.movie.year,
      director: '5d4ede7be361ba051fcafb45'
    });

    try {
      const result = await movie.save()
      addedMovie = { 
        ...result._doc, 
        director: director.bind(this, result._doc.director)
      };
      const director = await Director.findById('5d4ede7be361ba051fcafb45');
      if(!director) {
        throw new Error('Director doesn\'t Exist');
      }
      director.movies.push(movie);
      await director.save();
      return addedMovie;
    } catch (error) {
      throw error;
    }
  },
  addDirector: async args => {
    try {
      const directorExists = await Director.findOne({ name: args.director.name });
      if (directorExists) {
        throw new Error(`Director ${args.director.name} already exists`);
      } else {
        const director = new Director({
            name: args.director.name,
            birthday: new Date(args.director.birthday),
        });
        const result = await director.save()
        return { ...result._doc };
      }
    } catch (error) {
      throw error;
    }

  } 
}