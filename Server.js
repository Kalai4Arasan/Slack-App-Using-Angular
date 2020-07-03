const express=require('express');
const app=express();
server=app.listen(process.env.PORT | 3000 ,()=>{
    console.log("Connected to the server...");
})

const mongo=require('mongoose');
const socket=require('socket.io')(server);
var Schema = mongo.Schema;
mongo.connect('mongodb://localhost:27017/Slack', {useNewUrlParser: true});

const db=mongo.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

userModel=new Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    channels:Array,
    friends:Array,
    available:Number,
  });
MessageModel=new Schema({
    room:String,
    message:Array,
}),
channelModel=new Schema({
    channelName:String,
    channelType:String,
    createdDate:String,
    users:Object,
});

var User = mongo.model('user',userModel,'User');
var Message=mongo.model('message',MessageModel,'Messages');
var Channel=mongo.model('channel',channelModel,'Channel')

var user;
sockets = [];
people = {};
//console.log(socket);
socket.on('connect',(e)=>{
    //console.log(e)
    console.log('Your Now Connected...');

    e.on('disconnect',()=>{
        if(Object.keys(people).length>0){
        User.updateOne({name:people[e.id]['name']},{available:0},(err,r)=>{
            //console.log(r);
        })
        console.log(people[e.id]['name']+' are disconnected...')
        }
        if(people[e.id+'roomName']){
            // Message.updateOne({room:people[e.id+'roomName']},{
            //     message:people[e.id+people[e.id+"roomName"]]
            // },(err,r)=>{
            //     console.log(r);
            // })
            console.log(people[e.id]['name']+' leaved from '+people[e.id+'roomName'])
            delete people[e.id+'roomName'];
        }
        delete people[e.id];
    })
    e.on('Join',(name)=>{
        if(name){
        user=name;
        user['available']=1;
        people[e.id]=user;
        User.updateOne({name:name['name']},{available:1},(err,r)=>{
            //console.log(r);
        })
        console.log(name['name']+" joined in the conversation.");
        }
    })
    e.on('JoinRoom',(room)=>{
        e.join(room);
        people[e.id+'roomName']=room;
        console.log('Joined to '+room);
    })
    e.in(people[e.id+'roomName']).on('message', (data) => {
        Message.updateOne({room:people[e.id+'roomName']},
            { $push: {message:data}}
        ,(err,r)=>{
            console.log(r);
        })
        e.in(people[e.id+'roomName']).emit('new-message',data);
      });
})






app.get('/userDetails/:name',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    username=req.params.name;
    User.find({name:username},(err,doc)=>{
        if(Object.keys(doc).length>0){
            return res.send(doc[0]);
            }
        else{
            return res.send("No Data Found");
        }
    })
})

app.get('/channelDetails/:name',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    channelname=req.params.name;
    Channel.find({channelName:channelname},(err,doc)=>{
        if(Object.keys(doc).length>0){
            return res.send(doc[0]);
            }
        else{
            return res.send("No Data Found");
        }
    })
})

app.get('/message/:roomName',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    roomName=req.params.roomName;
    Message.find({room:roomName},(err,doc)=>{
        if(Object.keys(doc).length>0){
            return res.send(doc[0]);
            }
        else{
            return res.send("No Data Found");
        }
    })
})

// app.get('/setAvailability/:name',(req,res)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     console.log('you are avlailable');
//     username=req.params.name;
//     User.updateOne({name:username},{available:1},(err,result)=>{
//         return res.status(200).send(result);
//     })
// })

// app.get('/removeAvailability/:name',(req,res)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     console.log('you are not avlailable');
//     username=req.params.name;
//     User.updateOne({name:username},{available:0},(err)=>{
//         return res.status(200).send(result);
//     })
// })



