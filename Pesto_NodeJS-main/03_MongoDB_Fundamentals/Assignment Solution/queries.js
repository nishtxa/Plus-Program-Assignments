db.movies.insertMany([
    { title: "movie1", releaseYear: 2010, genre: "Sci-Fi", director: ObjectId("6640d0ccf76a14eb42d0d897"), actors: [ObjectId("6640d124f76a14eb42d0d89c"), ObjectId("6640d124f76a14eb42d0d89d")] },
    { title: "movie2", releaseYear: 2020, genre: "Action", director: ObjectId("6640d0ccf76a14eb42d0d898"), actors: [ObjectId("6640d124f76a14eb42d0d89d"), ObjectId("6640d124f76a14eb42d0d89e")] },
    { title: "movie3", releaseYear: 2013, genre: "Comedy", director: ObjectId("6640d0ccf76a14eb42d0d899"), actors: [ObjectId("6640d124f76a14eb42d0d89f"), ObjectId("6640d124f76a14eb42d0d8a0"), ObjectId("6640d124f76a14eb42d0d8a1")] },
    { title: "movie4", releaseYear: 2012, genre: "Horror", director: ObjectId("6640d0ccf76a14eb42d0d89a"), actors: [ObjectId("6640d124f76a14eb42d0d89c"), ObjectId("6640d124f76a14eb42d0d8a3")] },
    { title: "movie5", releaseYear: 2016, genre: "Action", director: ObjectId("6640d0ccf76a14eb42d0d89b"), actors: [ObjectId("6640d124f76a14eb42d0d89e"), ObjectId("6640d124f76a14eb42d0d89f")] },
    { title: "movie6", releaseYear: 2019, genre: "Comedy", director: ObjectId("6640d0ccf76a14eb42d0d897"), actors: [ObjectId("6640d124f76a14eb42d0d89d"), ObjectId("6640d124f76a14eb42d0d8a2")] },
    { title: "movie7", releaseYear: 2010, genre: "Sci-Fi", director: ObjectId("6640d0ccf76a14eb42d0d898"), actors: [ObjectId("6640d124f76a14eb42d0d8a2"), ObjectId("6640d124f76a14eb42d0d8a0")] },
    { title: "movie8", releaseYear: 2011, genre: "Action", director: ObjectId("6640d0ccf76a14eb42d0d899"), actors: [ObjectId("6640d124f76a14eb42d0d89d"), ObjectId("6640d124f76a14eb42d0d8a1")] },
    { title: "movie9", releaseYear: 2011, genre: "Sci-Fi", director: ObjectId("6640d0ccf76a14eb42d0d899"), actors: [ObjectId("6640d124f76a14eb42d0d89f"), ObjectId("6640d124f76a14eb42d0d89c")] },
    { title: "movie10", releaseYear: 2011, genre: "Comedy", director: ObjectId("6640d0ccf76a14eb42d0d89a"), actors: [ObjectId("6640d124f76a14eb42d0d8a0"), ObjectId("6640d124f76a14eb42d0d89e")] },
  ])

  db.directors.insertMany([
{ name: "director1", nationality: "British" },
{ name: "director2", nationality: "Indian" },
{ name: "director3", nationality: "American" },
 { name: "director4", nationality: "Indian" },
 { name: "director5", nationality: "British" },
])

  db.actors.insertMany([
  { name: "actor1", nationality: "British", },
  { name: "actor2", nationality: "American", },
  { name: "actor3", nationality: "British", },
  { name: "actor4", nationality: "American", },
  { name: "actor5", nationality: "British", },
  { name: "actor6", nationality: "Indian", },
  { name: "actor7", nationality: "Indian", },
  { name: "actor8", nationality: "Indian", },
])

// a) Find all movies released in a specific year. 

db.movies.find({ releaseYear: 2010 })

// b) Find all movies in a specific genre. 

db.movies.find({ genre: "Sci-Fi" })

// c) Find all movies directed by a specific director.

var director = db.directors.findOne({ name: "director1" })
db.movies.find({ director: director._id })

// d) Find all movies that a specific actor acted in. 

var actor = db.actors.findOne({ name: "actor1" })
db.movies.find({ actors: actor._id })

// e) Find all directors from a specific nationality. 

db.directors.find({nationality: 'Indian'});

// f) Find all actors from a specific nationality.

db.actors.find({nationality: 'Indian'});



