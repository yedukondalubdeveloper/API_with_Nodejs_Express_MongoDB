const express = require('express');
const mongoose = require('mongoose');
const BrandName = require('./model');
const app = express();

app.use(express.json())

mongoose.connect('mongodb+srv://project_1:project_1@cluster0.6qmy2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
 }).then(() => console.log('DB Connected...')
).catch(err => console.log(err))

app.post('/addbrands',async(req,res) => {
    const {brandname} = req.body;
    try {
        const newData = new BrandName({brandname});
        await newData.save();
        return res.json(await BrandName.find())
    } catch(err) {
        console.log(err.message);
    }
})

app.get('/getallbrands',async(req,res) => {
    try {
        const allData = await BrandName.find();
        return res.json(allData);
    } 
    catch(err){
        console.log(err.message);
    }
})

app.get('/getallbrands/:id', async (req, res) => {
    try {
        const Data = await BrandName.findById(req.params.id)
        return res.json(Data);
    }
    catch(err){
        console.log(err.message);
    }
})

app.delete('/deletebrand/:id', async (req,res)=> {
    try{
        await BrandName.findByIdAndDelete(req.params.id);
        return res.json(await BrandName.find());
    }
    catch(err) {
        console.log(err.message);
    }
})

app.get('/',(req,res) => {
    res.send('Hello World !!!')
})

app.listen(3000,() => console.log('Server is running...'))