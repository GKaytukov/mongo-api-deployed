import dbConnect from "./dbConnect.js";
import { ObjectId } from "mongodb"; //Importing ObjectId - unique identifiers for all the docs in db 
//export const getAllFurniture = async (req, res) =>{ is the same as the line 4
export async function getAllFurniture(req, res) {
    //First connect to the database 
    const db = dbConnect()
    //Get the whole collection 
    const collection = await db.collection("furniture").find().toArray()
        //Catch any errors -> Send to status 500
        .catch(err => {
            res.status(500).send(err);
            return;
        });
    //Send back the array of furniture
    res.set('Cache-Control', 'public, max-age=300,s-maxage=600')
    //To come super fast
    res.send(collection);

}

export async function addNewFurniture(req, res) {
    //The information is coming from the body of the request ()
    const { brand, model, type, price } = req.body
    const newFurniture = { brand, model, type, price: Number(price) }
    //Connect to database 
    const db = dbConnect()
    //We are getting the information from addNewFurniture 
    await db.collection('furniture').insertOne(newFurniture)
        //I am calling the API 
        //Put this new furniture into our furniture collection in our db
        //Catch error and send with status 500
        .catch(err => {
            res.status(500).send(err)
            return
        })
    //Return response with 201 all bueno
    res.status(201).send({ message: 'Furniture added' })

}
//Update
export async function updateFurniture(req, res) {
    const { furnitureId } = req.params
    const db = dbConnect()
    await db.collection('furniture')
        .findOneAndUpdate({ _id: new ObjectId(furnitureId) }, { $set: req.body })
        .catch(err => {
            res.status(500).send(err)
            return
        })
    res.status(202).send({ message: 'updated furniture' })
}

//We are connecting to our own database in our file (const db = dbConnect()s)
//We are getting db.collection("furniture").find().toArray() getting our furniture collection into the database, setting it into an array
//We are assigning a variable the variable is collection 
//We get the 2 types of furniture returned as an array
