require("dotenv").config();
const express = require("express");
const { ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
const { connectToServer, getDb } = require("./utils/dbConnect");


app.use(cors());
app.use(express.json());


connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } else {
    console.log(err);
  }
});



const run = async () => {
  
  try {
  
    


    app.get("/products", async (req, res) => {
       const db =getDb()
      const productCollection = db.collection("product");
      const cursor = productCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    });

    app.post("/product", async (req, res) => {
      const db =getDb()
      const productCollection = db.collection("product");

      const product = req.body;
      
      const result = await productCollection.insertOne(product);

      res.send(result);
    });

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;

      const result = await productCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });

    app.get("/product/:id", async(req,res)=>{
      const db =getDb()
      const productCollection = db.collection("product");
      const id =req.params.id;
      
      const result =await productCollection.findOne({_id:ObjectId(id)})
       
      res.send(result)
    })
  } 

  
  
  finally {
 
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

