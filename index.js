
const express=require("express");
const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

const app=express();


var cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors()) // Use this after the variable declaration


const PORT=process.env.PORT ||8081;
app.listen(PORT, function(){
  console.log("escuchando en el puerto 8081")
})


app.get('/informacion', function(req, res){
    res.send("api funcionando correctamente")
})
app.post('/get', function(req, res){
    const name = req.body.name
    const mail= req.body.mail
    const payment = req.body.payment
    const phone= req.body.phone
    const service=req.body.service
    const web=req.body.web
    console.log(name, mail, payment, phone, service, web)
    
})

app.post('/enviar',async (req, res)=>{
 
  const name = req.body.name
    const mail= req.body.mail
    const payment = req.body.payment
    const phone= req.body.phone
    const service=req.body.service
    const web=req.body.web
  
  function mailToMyself(){
      
    let transporter = nodemailer.createTransport({
      service: 'gmail',
        // true for 465, false for other ports
        auth: {
          user: 'alojaaasa@gmail.com', // generated ethereal user
          pass: 'rebrmqzksitrawuc', // generated ethereal password
        }
      
      });
  
  
  
      var mailOptions = {
        from: '"Mensaje en pagina Kinetic" <damian.luis.porta@gmail.com>', // sender address
        to: `damian.luis.porta@gmail.com`, // sender addresslist of receivers
        subject: "Nuevo en Kinetic", // Subject line
         // plain text body
        html: `<h4>Nombre del cliente: ${name} <br>
        Mail de contacto: ${mail}<br>
        Numero de contacto: ${phone}<br>
        Tipo de servicio: ${service}<br>
        Presupuesto estimado: ${payment}<br>
        Ejemplo de referencia (opcional): ${web}<br>
        
        `,
        // html bod
        
      }
      
      
      transporter.sendMail(mailOptions,(error,info) => {
        console.log("senMail returned!");
        if (error) {
          console.log("ERROR!!!!!!", error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
  }
  
  
  function mailAutoReply(){
      
    let transporter = nodemailer.createTransport({
      service: 'gmail',
        // true for 465, false for other ports
        auth: {
          user: 'alojaaasa@gmail.com', // generated ethereal user
          pass: 'rebrmqzksitrawuc', // generated ethereal password
        }
      
      });
  
  
  
      var mailOptions = {
        from: '"Kinetic" <alojaaasa@gmail.com>', // sender address
        to: `${mail}`, // list of receivers
        subject: "Kinetic", // Subject line
         // plain text body
         text: "",
        html: `<div style="height:auto;width:100vw;border:solid 1px black;padding:15px;border-radius:10px;">
        
        <h2>Thank you for get in touch with us! <h2><br>
        <h2>We've received your message successfully, one of the member of our team will send you a message.</h2>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <h3>Kinetic team. </h3>
        
        
        </div>`// html body
      }
      
      
      transporter.sendMail(mailOptions,(error,info) => {
        console.log("senMail returned!");
        if (error) {
          console.log("ERROR!!!!!!", error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
  }
  
  var mails = [mailToMyself,mailAutoReply]
  
  
  for (var i=0; i<2;i++){
      mails[i]()
  }
    
  return res.send("mensaje enviado correctamente")
     
  })

