const fs = require('fs');
const { MongoClient } = require('mongodb');

// Read the JSON file
const jsonData = fs.readFileSync('path/to/your/cypress/results.json', 'utf8');
const parsedData = JSON.parse(jsonData);

// Connect to MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'yourDatabaseName';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function saveToDatabase() {
  try {
    await client.connect();
    console.log('Connected to database');
    const db = client.db(dbName);
    const collection = db.collection('yourCollectionName');
    
    // Insert JSON data into the collection
    await collection.insertOne(parsedData);
    console.log('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await client.close();
  }
}

saveToDatabase();
    