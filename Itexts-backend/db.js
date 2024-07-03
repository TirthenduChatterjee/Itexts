const mongo = require('mongoose');
url="mongodb://localhost:27017/iNoteBook";
const connectToMongo= async()=>{
  await mongo.connect(url);
   console.log("Connected to Database Successfully ....");
}
module.exports=connectToMongo;