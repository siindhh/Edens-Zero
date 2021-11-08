const express = require("express");
const app=express();
const port =5000;
const bp=require("body-parser");
const qr=require("qrcode");
var cors = require('cors');
app.use(cors());
app.set("view engine","ejs");
app.use(bp.urlencoded({extended:false}));
app.use(bp.json());
app.use(express.json({limit:"10mb"}));
app.get("/",(req,res)=>{
    res.render("index");
});

const { CloudantV1, CouchdbSessionAuthenticator } = require('@ibm-cloud/cloudant');

const authenticator = new CouchdbSessionAuthenticator({
  username: 'apikey-v2-lhci1ho26palm8xy8y3h926ppwm43dti093az87ml6y',
  password: '7a2fcec32bebf16067363c443377e9e6'
});

const service = new CloudantV1({
  authenticator: authenticator
});

service.setServiceUrl('https://apikey-v2-lhci1ho26palm8xy8y3h926ppwm43dti093az87ml6y:7a2fcec32bebf16067363c443377e9e6@8708b7dd-ed63-4a3d-957a-714997d04c9b-bluemix.cloudantnosqldb.appdomain.cloud');


app.post("/scan",(req,res)=>{
    const prodn=req.body.prdname;
    const prdid=req.body.prdid;
    const price=req.body.price;
    const title=req.body.title;
    const image=req.body.image;
    const company=req.body.company;
    const info=req.body.info;
    const tojson={
        prodn,prdid,price,title,image,company,info
    };
    const fin=JSON.stringify(tojson);
    console.log(fin);
    const rand=Math.round(Math.random()*1000000000);//key
    console.log(rand);


    const productsDoc = {
        _id: `products:${rand}`,
        type: 'product',
        productid: prdid,
        productName: prodn,
        price: price,
        title:title,
        image:image,
        company:company,
        info:info
      };


      service.postDocument({
        db: 'flashncode',
        document: productsDoc
      }).then(response => {
        console.log(response.result);
        if(price.toString().length===0)res.send("Empty Data!");
        qr.toDataURL("http://localhost:3000/productDetail/"+rand.toString(),(err,src)=>{//concatanate here
            if(err) res.send("Error occured");
            res.render("scan",{src});
        });
      });
});

app.get('/Product/:productId', (req, res) => {
    const productId = req.params.productId;
    service.getDocument({
      db: 'flashncode',
      docId: `products:${productId}`
    }).then(response => {
      res.send(response.result);
    });
})
app.listen(port,()=>console.log("Server at 5000"));
