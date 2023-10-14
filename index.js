const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


app.use(cors());
app.use(express.json());


app.get('/',(req,res) => {
    res.send('Apner server thik ache choltache')
})



const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.4ievbno.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    
    await client.connect();

    

    const databaseCollection = client.db('CoffeeDB').collection('coffee');


    app.get('/coffees',async(req,res) => {
       const coffees = await databaseCollection.find().toArray('coffee');
       res.send(coffees) 
    })

    app.get('/coffee/:id',async(req,res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await databaseCollection.findOne(query);
      res.send(result);
    })

    app.post('/coffees',async(req,res) => {
        const coffees = req.body;
        const result = await databaseCollection.insertOne(coffees);
        res.send(result)
    })


    app.delete('/coffee/:id',async(req,res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await databaseCollection.deleteOne(query);
      res.send(result);
    })


    app.put('/updateCoffee/:id',async(req,res) => {
      const id = req.params.id;
      const coffe = req.body;
      const query = {_id:new ObjectId(id)};
      const options = { upsert: true };
      const updateCoffee = {
        $set: {
          name: coffe.name,
          chef: coffe.chef,
          supplier: coffe.supplier,
          taste: coffe.taste,
          category: coffe.category,
          details: coffe.details,
          photo: photo.photo,
        },
      };

      const resilt = await databaseCollection.updateOne()

    })




    
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);




app.listen(port,() => {
    console.log('the server is running')
})