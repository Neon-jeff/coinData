require('dotenv').config()
const { default: axios } = require('axios')
const PORT = process.env.PORT || 3030
const express=require('express')
const {coinData}=require('./scrapper')

const app=express()

app.get('/api/crypto-data',async (req,res)=>{
    let data=await coinData()
    res.status(200).json(
        {coindata:data}
    )
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});


