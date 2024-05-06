const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
const bookingCollection = client.db('rentHouse').collection('bookings');
const orderCollection = client.db('rentHouse').collection('orders');
const buySells = client.db('rentHouse').collection('oldGoods');

const createAdvertisings = client.db('rentHouse').collection('advertising');

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


// read renthouse
app.get('/rentHouses/:id', async(req, res) =>{
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const options = {
      projection: {title: 1, image: 1,  location: 1, price: 1, gender: 1, email: 1},
  };

  const result = await rentServices.findOne(query, options);
  res.send(result);
})
// rent house post controll
app.patch('/rentHouses/:id', async(req, res)=> {
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)};
  const updatedPost = req.body;
  console.log(updatedPost);
  const updateDoc = {
    $set: {
      status: updatedPost.status
    },
  };
  const result = await rentServices.updateOne(filter, updateDoc);
  res.send(result);
})
app.delete('/rentHouses/:id', async(req, res) =>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await rentServices.deleteOne(query);
  res.send(result);
})
// my rent house post
app.get('/rentHouses', async(req, res) =>{
  let query = {};
  if(req.query?.email){
    query = {email: req.query.email}
  }
  const result = await rentServices.find(query).toArray();
  res.send(result);
})
// my buy sell post
app.get('/buySell', async(req, res) =>{
  let query = {};
  if(req.query?.email){
    query = {email: req.query.email}
  }
  const result = await buySells.find(query).toArray();
  res.send(result);
})

// buy sell post control
app.patch('/buySell/:id', async(req, res)=> {
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)};
  const updatedPost = req.body;
  console.log(updatedPost);
  const updateDoc = {
    $set: {
      status: updatedPost.status
    },
  };
  const result = await buySells.updateOne(filter, updateDoc);
  res.send(result);
})
app.delete('/buySell/:id', async(req, res) =>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await buySells.deleteOne(query);
  res.send(result);
})
// booking
app.post('/bookings', async(req, res) =>{
  const addBooking = req.body;
  console.log(addBooking);
  const result = await bookingCollection.insertOne(addBooking);
  res.send(result);
})
// my booking
app.get('/bookings', async(req, res) =>{
  let query = {};
  if(req.query?.
    email){
    query = {
      cutomerEmail: req.query.
      email}
  }
  const result = await bookingCollection.find(query).toArray();
  res.send(result);
})
app.delete('/bookings/:id', async(req, res) =>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await bookingCollection.deleteOne(query);
  res.send(result);
})
// booking controll
app.get('/myBookings', async(req, res) =>{
  let query = {};
  if(req.query?.
    email){
    query = {
      email: req.query.
      email}
  }
  const result = await bookingCollection.find(query).toArray();
  res.send(result);
})
app.patch('/bookings/:id', async(req, res)=> {
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)};
  const updatedPost = req.body;
  console.log(updatedPost);
  const updateDoc = {
    $set: {
      status: updatedPost.status
    },
  };
  const result = await bookingCollection.updateOne(filter, updateDoc);
  res.send(result);
})
// order part
app.get('/buySell/:id', async(req, res) =>{
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const options = {
      projection: {title: 1, image: 1,  location: 1, price: 1, email: 1},
  };

  const result = await buySells.findOne(query, options);
  res.send(result);
})
// order
app.post('/orders', async(req, res) =>{
  const addOrder = req.body;
  console.log(addOrder);
  const result = await orderCollection.insertOne(addOrder);
  res.send(result);
})
// my order
app.get('/orders', async(req, res) =>{
  let query = {};
  if(req.query?.
    email){
    query = {
      cutomerEmail: req.query.
      email}
  }
  const result = await orderCollection.find(query).toArray();
  res.send(result);
})
app.delete('/orders/:id', async(req, res) =>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await orderCollection.deleteOne(query);
  res.send(result);
})
// order controll
app.get('/myOrders', async(req, res) =>{
  let query = {};
  if(req.query?.
    email){
    query = {
      email: req.query.
      email}
  }
  const result = await orderCollection.find(query).toArray();
  res.send(result);
})
app.patch('/orders/:id', async(req, res)=> {
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)};
  const updatedPost = req.body;
  console.log(updatedPost);
  const updateDoc = {
    $set: {
      status: updatedPost.status
    },
  };
  const result = await orderCollection.updateOne(filter, updateDoc);
  res.send(result);
})

// advertising
app.post('/createAdvertisings', async(req, res) =>{
  const createAdvertising = req.body;
  console.log(createAdvertising);
  const result = await createAdvertisings.insertOne(createAdvertising);
  res.send(result);
})

// my advertising post
app.get('/createAdvertisings', async(req, res) =>{
  let query = {};
  if(req.query?.email){
    query = {email: req.query.email}
  }
  const result = await createAdvertisings.find(query).toArray();
  res.send(result);
})
app.get('/createAdvertisings/:id', async(req, res) =>{
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const options = {
      projection: {title: 1, image: 1,  location: 1, price: 1, gender: 1, email: 1},
  };

  const result = await createAdvertisings.findOne(query, options);
  res.send(result);
})
// advertising post controll
app.patch('/createAdvertisings/:id', async(req, res)=> {
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)};
  const updatedPost = req.body;
  console.log(updatedPost);
  const updateDoc = {
    $set: {
      status: updatedPost.status
    },
  };
  const result = await createAdvertisings.updateOne(filter, updateDoc);
  res.send(result);
})
app.delete('/createAdvertisings/:id', async(req, res) =>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await createAdvertisings.deleteOne(query);
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
