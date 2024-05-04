import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let movieID = req.body.id;
	let sql = `SELECT * FROM movies`;
	let data = [movieID];
	
	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();

});

app.post('/api/getMoviesByGenre', (req, res) => {
	const connection = mysql.createConnection(config);
	const genre = req.body.genre;
	const sql = `SELECT m.name
				FROM movies m, movies_genres g
				WHERE m.id = g.movie_id
				AND g.genre = ?;`;

	const data = [genre];

	connection.query(sql, data, (error, results, fields) => {
	  if (error) {
		return console.error(error.message);
	  }
	  const string = JSON.stringify(results);
	  const obj = JSON.parse(string);
	  res.send({ express: string });
	});
	connection.end();
  });
  

app.post('/api/getGenres', (req, res) => {

	let connection = mysql.createConnection(config);

	let genreID = req.body.id;
	let sql = `SELECT DISTINCT genre FROM movies_genres;`;
	let data = [genreID];
	
	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();

});

app.post('/api/getSearch', (req, res) => {
	let connection = mysql.createConnection(config);

	let movieName = req.body.movieName;
	let actorName = req.body.actorName;
	let directorName = req.body.directorName;

	let sql = `SELECT m.name, group_concat(DISTINCT CONCAT(d.first_name,' ', d.last_name) separator ', ') as Directors , group_concat(DISTINCT re.reviewContent separator ' // ') as Reviews, AVG(re.reviewScore) as AverageScore
				FROM movies m
				JOIN movies_directors md on md.movie_id = m.id
				JOIN directors d on d.id = md.director_id
				JOIN roles r on r.movie_id = m.id
				JOIN actors a on a.id = r.actor_id
				LEFT JOIN Review re on re.movieID = m.id
				WHERE 1=1
				`
				;
	let end = 'GROUP BY m.id'

	let data = [];
	
	if (movieName) {
		sql = sql + ` AND m.name like '%${movieName}%'`;

	}
	if (actorName) {
		let actorFirstName = (actorName.split(' '))[0]
		let actorLastName = (actorName.split(' '))[1]
		
		if(actorLastName){
			sql = sql + ` AND a.first_name like '%${actorFirstName}%' AND a.last_name like '%${actorLastName}%'`;
		}
		else{
			sql = sql + ` AND (a.first_name like '%${actorName}%' OR a.last_name like '%${actorName}%')`;
		}
	}
	if (directorName) {
		let directorFirstName = (directorName.split(' '))[0]
		let directorLastName = (directorName.split(' '))[1]
		
		if(directorLastName){
			sql = sql + ` AND d.first_name like '%${directorFirstName}%' AND d.last_name like '%${directorLastName}%'`;
		}
		else{
			sql = sql + ` AND (d.first_name like '%${directorName}%' OR d.last_name like '%${directorName}%')`;
		}
	}
	sql = sql + end;
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		res.send({ express: JSON.stringify(results) });
	});
	connection.end()
})

app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config);
	
	const sql = `INSERT INTO Review (userID, movieID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)`;
	const values = [req.body.userID, req.body.movieID, req.body.reviewTitle, req.body.reviewContent, req.body.reviewScore];
  
	connection.query(sql, values, (error, result, fields) => {
	  if (error) {
		return console.error(error.message);
	  }

	  let string = JSON.stringify(results);
	  res.send({ express: string });
	});
	connection.end();
  });

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server