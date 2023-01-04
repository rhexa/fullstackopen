const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.use(require('./routes'))

app.get('/', (req,res)=>{
  res.send('hello world')
})

app.listen(PORT, ()=>console.log(`backend running at http://localhost:${PORT}`))