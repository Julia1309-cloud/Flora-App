const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json({limit:'10mb'}));
app.use((req,res,next)=>{res.header('Access-Control-Allow-Origin','*');res.header('Access-Control-Allow-Headers','Content-Type');if(req.method==='OPTIONS')return res.sendStatus(200);next();});

app.get('/',(req,res)=>res.send('Flora Proxy OK'));

app.post('/claude',async(req,res)=>{
  try{
    const r=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':process.env.CLAUDE_KEY,'anthropic-version':'2023-06-01'},
      body:JSON.stringify(req.body)
    });
    const d=await r.json();
    res.status(r.status).json(d);
  }catch(e){res.status(500).json({error:e.message});}
});

app.listen(process.env.PORT||3000,()=>console.log('Flora Proxy running'));
