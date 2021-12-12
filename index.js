const express=require('express');
const path=require('path');
const port=8000;

//connecting to our app to mongo database
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));

var contactList=[
    {
    name:"milu",
    phone:"1234567890",
    },
     {
    name:"sibu",
    phone:"1111111111",
    },



]
app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }

    return res.render('home',{
        title:"my contact",
        contact_list:contacts
    });
});

});


app.post("/create-contact",function(req,res){
    // console.log(req.body);
    // contactList.push(req.body);

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }

        console.log('**********',newContact);
        return res.redirect('back');

    
});
});
app.get('/delete-contact/',function(req,res){
    //get the id from query in url
    let id=req.query.id;

    //find the contact in database using id

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting a contact');
            return;
        }
        return res.redirect('back');
    });

    // console.log(req.query);
    // let phone=req.query.phone;
    // let contactIndex=contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex!=-1){
    // contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');
    
    
});


app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Server is running on port: '+port);
    }
});