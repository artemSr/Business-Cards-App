const express = require('express');
const fetch = require('node-fetch');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();

const csvWriter = createCsvWriter({
    path: 'persons.csv',
    header: [
        {id: 'id', title: 'id'},
        {id: 'first_name', title: 'first_name'},
        {id: 'last_name', title: 'last_name'},
        {id: 'email', title: 'email'},
    ]
});

app.use(express.static(__dirname + '/public'));

const api_url = 'https://reqres.in/api/users';

fetch(api_url)
    .then(res=> res.json())
    .then(persons => csvWriter.writeRecords(persons.data)
        .then(()=> console.log('CSV file was written successfully')))

app.get('/api/users',(req, res) => {
    fetch(api_url)
        .then(res=> res.json())
        .then(data=> JSON.stringify(data.data))
        .then(users=> res.send(users))
})
app.listen(3000,()=>{
    console.log('Server starts... \n' + 'http://localhost:3000/')
})
