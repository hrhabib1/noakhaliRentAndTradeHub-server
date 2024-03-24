const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middlewire
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nwzqkqi.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const rentServices = client.db('rentHouse').collection('houses');

const buySells = client.db('rentHouse').collection('oldGoods');

app.get('/rentHouses', async(req, res) =>{
  const cursor = rentServices.find();
  const result = await cursor.toArray();
  res.send(result);
})

app.post('/rentHouses', async(req, res) =>{
  const rentHouse = req.body;
  console.log(rentHouse);
  const result = await rentServices.insertOne(rentHouse);
  res.send(result);
})
app.post('/buySell', async(req, res) =>{
  const buySell = req.body;
  console.log(buySell);
  const result = await buySells.insertOne(buySell);
  res.send(result);
})

app.get('/buySell', async(req, res) =>{
  const cursor = buySells.find();
  const result = await cursor.toArray();
  res.send(result);
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('This server is running')
})
app.listen(port, () => {
    console.log(`This server is runig on port ${port}`)
})
