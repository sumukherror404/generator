const express = require('express');
const fs = require('fs');
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://sumukhremala:Sumukh123@cluster0.2av8api.mongodb.net/PassGen";
const app = express();
app.set('view engine','ejs');
const dataFilePath = "C:/Users/SUMUKH R/Downloads/data.json"; // the file path to your data file
const client = new MongoClient(uri,{useNewUrlParser:true});
client.connect((err)=>{
  if(err) throw err;
})
const collection = client.db("PassGen").collection("ListOfIt");
app.get('/data', (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error getting data');
    }
    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData.loginid);
      console.log(jsonData.password);
      collection.insertOne({Account:jsonData.loginid,Password:jsonData.password},function(err,result){
        if(err) throw err;
        
      });
      //res.render('output',{UAP:jsonData});
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error parsing data');
    }
      
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});