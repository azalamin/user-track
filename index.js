const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://usertracker:${process.env.DB_PASS}@cluster0.2jfkpef.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ordcu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	try {
		await client.connect();
		const sectorCollection = client.db('User_Tracker').collection('sectors');
		const userDataCollection = client.db('User_Tracker').collection('user-data');
		console.log('db connected');

		app.get('/sector', async (req, res) => {
			const result = await sectorCollection.find().toArray();
			res.send(result);
		});

		app.post('/user', async (req, res) => {
			const userData = req.body;
			const result = await userDataCollection.insertOne(userData);
			res.send(result);
		});

		app.get('/user-info', async (req, res) => {
			const result = await userDataCollection.find().toArray();
			res.send(result);
		});

		app.get('/my-info/:id', async (req, res) => {
			const id = req.params.id;
			console.log(id)
			const query = { _id: ObjectId(id) };
			const result = await userDataCollection.findOne(query);
			res.send(result);
		});

		app.delete('/user/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await userDataCollection.deleteOne(query);
			res.send(result);
		});

		app.put('/user/:id', async (req, res) => {
			const id = req.params.id;
			const userData = req.body;
			const query = { _id: ObjectId(id) };
			const updatedDoc = {
				$set: userData,
			};
			const result = await userDataCollection.updateOne(query, updatedDoc);
			res.send(result);
		});

		
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('Welcome to user tracker app');
});

app.listen(port, () => {
	console.log('Listen to the port', port);
});
