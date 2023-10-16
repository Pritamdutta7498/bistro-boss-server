const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zynq1cd.mongodb.net/?retryWrites=true&w=majority`;


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

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);





app.get("/", (req, res) => {
  res.send("welcome to bistro boss");
});

app.listen(port, () => {
  console.log(`listening on port, ${port}`);
});


// const menuCollection = client.db("bistroDb").collection("menu");
// const reviewCollection = client.db("bistroDb").collection("reviews");
// const cartCollection = client.db("bistroDb").collection("carts");
// // get menu data from collection
// app.get("/menu", async (req, res) => {
//   const result =  await menuCollection.find().toArray();
//   res.send(result);
// });
// // get review data from collection
// app.get('/reviews', async(req, res)=>{
//   const result = await reviewCollection.find().toArray();
//   res.send(result)
// })

// //insert cart data into  cart collection
// app.post('/carts', async (req, res) =>{
//   const item = req.body;
//   console.log(item);
//   const result = await cartCollection.insertOne(item);
//   res.send(result)
// })
