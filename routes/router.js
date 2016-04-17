module.exports = function(app){

	var mongoURI = 'mongodb://localhost:27017/mogli';

	var mongo = require('mongodb').MongoClient;

	app.get('/promoter', function(req, res){

		var query = req.query;

			mongo.connect(mongoURI, function(err, db) {
				db.collection('promoter').find(query).toArray(function(err, doc){
					if (err) throw err;

					console.dir(doc);
					res.json(doc);
					return db.close();
				});
			});

	});

	app.post('/promoter', function(req, res){

		var body = {
			nome: req.body.nome,
			username: req.body.username,
			senha: req.body.senha,
			email: req.body.email
		}

		mongo.connect(mongoURI, function(err, db) {
			db.collection('promoter').insert(body, function(err, data){
				if (err) throw err;

		        res.send('Usuario inserido');
		        return db.close();
			});
		});
	});

	app.put('/promoter', function(req, res){
		var query = req.query;

		var update = {

			$set: req.body

		}

		mongo.connect(mongoURI, function(err, db) {
			db.collection('promoter').update(query, update, {upsert: true}, function(err, data){
				if (err) throw err;

		        res.send('Usuario modificado');
		        return db.close();
			});
		});
	});

	app.delete('/promoter', function(req, res){

		var query = req.query;

			mongo.connect(mongoURI, function(err, db) {
				db.collection('promoter').deleteOne(query, function(err, doc){
					if (err) throw err;

		        	res.send('Usuario deletado');
					return db.close();
				});
			});
	});
}