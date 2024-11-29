//npm int -y--->istalls package.json--->this has some default information will be there and also the ones which we install
//why do we need though?? after 10 yrs as the express version changes we need these to deploy this in some server or something
//client-server: 
//http: && https: additional security
//software ruuning in server-->web server-->this is responsible for accessing the req and to send back the res(node js-->helps to create a webserver)
//API-application programming interface

import express from "express";
import {MongoClient ,ObjectId} from "mongodb";
import cors from "cors"
// const uri ="mongodb://127.0.0.1:27017"
const usr= encodeURIComponent("mvsgowthamreddy09")
const pwd=encodeURIComponent("k40lBV8cxknylCZh")
const uri=`mongodb+srv://${usr}:${pwd}@cluster0.ddvid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client =new MongoClient(uri)
const db=client.db("ecomm")
const app=express();
app.use(express.json());
app.use(cors());
const port=8080;
app.listen(port,()=>{
    console.log(`Server started on ${port}`); //new server gets created 
    
})
// app.get("/",(req,res)=>{                    //API
//     res.send("Home Page")
// })
// app.get("/about",(req,res)=>{               //API
//     res.send("About Page")
// })
// app.get("/name",(req,res)=>{               //API
//     res.send("M.V.Sai Gowtham Reddy")
// })
// app.get("/customers",(req,res)=>{               //API
      
        
//             let customers=
//             [
//                 {
//                 "name":"Gowtham",
//                 "age":21,
//                 "email":"abc@gmail.com",
//                 "city":"Kurnool"
//                  },
//                  {
//                     "name":"Gow",
//                     "age":21,
//                     "email":"ababa@gmail.com",
//                     "city":"Hyderabad"
//                  }
//             ];
       
           

    
//     res.json(customers)
// })

app.get("/",async(req,res)=>{
const items=await db.collection("products").find().toArray()
res.status(200).json(items)
}
)

app.post("/", async (req, res) => {
    const { name, price ,description,url} = req.body;
    const data = {
      name: name,
      price: price,
      desc:description,
      url:url
    };
    const newProduct = await db.collection("products").insertOne(data);
    res.status(200).json(newProduct);
  });
  
  
  app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
      res.status(200).json(newProduct);
    });

//react application has the capability to goto backend and fetch the data