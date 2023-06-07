const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const cors = require("cors");
const multer = require("multer");
const port = process.env.PORT || 4000;
const pdp = path.join(__dirname, "./database");
const app = express();
const fs = require("fs");
const { send } = require("process");
app.use(express.static(pdp));
app.use(cors());
app.use(express.json())
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });


/////////////////// mysql connection

const mysql = require("mysql");
const connectionData = {
  host:'localhost',
  user:'root',
  password:'',
  database:'petgram'
}
const connection = mysql.createConnection(connectionData)

////////////// server listener

server.listen(port, () => {
  console.log(`server is up on port ${port}!`);

  // connection.connect((err)=> {
  //   if(err) {
  //     console.log('Error de conneccion:',err);
  //   }else {
  //     console.log('Conectado a la base de datos');

  //     const newUser = {
  //       name:"sina",
  //       lastName:"majnoon",
  //       email:"sina.majnoon@gmail.com",
  //       password:"1234"

  //     }
  //     const consult = `INSERT INTO users (name,lastName,email,password) VALUES ('${newUser.name}','${newUser.lastName}','${newUser.email}',PASSWORD('${newUser.password}'))`;

  //     connection.query(consult,(err,res)=> {
  //       if(err) {
  //         console.log(err.errno);
  //       }else {
  //         console.log(res);
  //       }
  //     })

  //     connection.end();
  //   }
  // })


  // connection.connect((err)=> {
  //   if(err) {
  //     console.log('Error de conneccion:',err);
  //   }else {
  //     console.log('Conectado a la base de datos');

     
  //     const consult = "SELECT * FROM users";

  //     connection.query(consult,(err,res)=> {
  //       if(err) {
  //         throw err;
  //       }else {
  //         console.log(res);
  //       }
  //     })

  //     connection.end();
  //   }
  // })

  // connection.connect((err)=> {
  //   if(err) {
  //     throw err;
  //   }else {
  //     const storys = JSON.parse('[{"email":"sina.majnoonhjk","id":"st123","date":"10-02-2023","time":"14:20"},{"email":"sina.majnoonhjk","id":"st124","date":"10-02-2023","time":"18:20"},{"email":"mani.mani","id":"st123","date":"10-02-2023","time":"18:20"},{"email":"sina.majnoonhjk","id":"st125","date":"10-02-2023","time":"18:20"},{"email":"mani.mani","id":"st124","date":"16-04-2023","time":"13:20"},{"email":"mani.mani","id":"st125","date":"10-01-2023","time":"18:20"}]') 
  //     storys.forEach(s => {
  //       const consult = "INSERT INTO storysadres SET ?";
  //       connection.query(consult,s,(err)=> {
  //         if(err) {
  //           console.log(err);
  //         }else {
  //           console.log("se ha guardado");
  //         }
  //       })
  //     })

  //     connection.end();
  //   }
  // })
  
});

/////////////////  Socket.io connection

io.on("connect", (client) => {
  console.log("new connect");

  client.on("commend", (story,commend) => {
    fs.readFile(`./database/${story.user}/commends/${story.id}.json`,(err,data)=> {
      if(err) throw err;
      let commends = JSON.parse(data.toString());
      commends.push(commend);
      fs.writeFile(`./database/${story.user}/commends/${story.id}.json`,JSON.stringify(commends),(err)=> {
        if(err) throw err;
        io.emit("commend"+story.id,commend);
      })

    })
  });

  client.on("like",(story,user)=> {
    fs.readFile(`./database/${story.user}/storys/${story.id}.json`,(err,data)=> {
      if(err) throw err;
      let story_ = JSON.parse(data.toString());
      let search = story_.likes.find(u => u == user);
      if(!search) {
        story_.likes.push(user);
        fs.writeFile(`./database/${story.user}/storys/${story.id}.json`,JSON.stringify(story_),(err)=> {
          if(err) throw err;
          io.emit("like"+story.id,user);
        })
      }
    })
  })

  client.on("view",(story,user)=> {
    fs.readFile(`./database/${story.user}/storys/${story.id}.json`,(err,data)=> {
      if(err) throw err;
      let story_ = JSON.parse(data.toString());
      let search = story_.view.find(u => u == user);
      if(!search) {
        story_.view.push(user);
        fs.writeFile(`./database/${story.user}/storys/${story.id}.json`,JSON.stringify(story_),(err)=> {
          if(err) throw err;
          io.emit("view"+story.id,user);
        })
      }
    })
  })

  client.on("disconnect", () => {
    console.log("new disconnect");
  });
});


////////////////  server GETS

app.get("/storysAdres",(req,res)=> {
  let connection = mysql.createConnection(connectionData);
  connection.connect((err)=> {
    if(err) {
      res.send(err);
    }else {
      const consult = `SELECT email,id,date,time FROM storysadres`; 

      connection.query(consult,(err,resp)=> {
        if(err) {
          res.send(err);
        }else {
          console.log(resp)
          res.send(resp)
        }
      })
      connection.end();
    }
  })
})

//////////////// server POSTS


app.post("/login",(req,res)=> {
  const email = req.body.email;
  const password = req.body.password;
  let connection = mysql.createConnection(connectionData);
  connection.connect((err)=> {
    if(err) {
      res.send(err);
    }else {
      const consult = `SELECT * FROM users WHERE email = '${email}' AND password = PASSWORD('${password}') `; 

      connection.query(consult,(err,resp)=> {
        if(err) {
          res.send(err);
        }else {
          console.log(resp)
          res.send(resp)
        }
      })
      connection.end();
    }
  })

})
app.post("/downloadStorys",multer().none(),(req,res)=> {

  try {
    fs.readFile("./database/usersData.json",(err,data)=> {
      if(err) throw err;
      const usersData = JSON.parse(data.toString());
      res.send(JSON.stringify(usersData.storys));
    })
  } catch (error) {
    res.send(error);
  }
})
app.post("/downloadStory",multer().none(),(req,res)=> {
  try {
    fs.readFile(`./database/${req.body.user}/storys/${req.body.storyId}.json`,(err,data)=> {
      if(err) throw err;
      fs.readFile(`./database/${req.body.user}/commends/${req.body.storyId}.json`,(err,_data)=> {
        if(err) throw err;
        let story = JSON.parse(data.toString());
        let commends = JSON.parse(_data.toString());
        res.send(JSON.stringify({story,commends}));
      })
    })
  } catch (error) {
    res.send(error);
  }
})
app.post("/downloadComments",multer().none(),(req,res)=> {
  try {
    fs.readFile(`./database/${req.body.user}/commends/${req.body.storyId}.json`,(err,data)=> {
      if(err) throw err;
      res.send(data.toString());
    })
  } catch (error) {
    res.send(error);
  }
})
app.post("/profileData",multer().none(),(req,res)=> {
  let user = req.body.user;
  fs.readFile(`./database/${user}/userData.json`,(err,data)=> {
    if(err) throw err;
    
    let {user,userName,profileImage,storys,pendingFollowers,followers,following,pets} = JSON.parse(data.toString());
    let pets_ = [];
    pets.forEach(p => {
      fs.readFile(`./database/${user}/pets/${p}.json`,(err,data)=> {
        if(err) throw err;
        pets_.push(JSON.parse(data.toString()));
        if(pets_.length == pets.length) {
          res.send(JSON.stringify({user,userName,profileImage,storys,pendingFollowers,followers,following,pets:pets_}));
        }
      })  
    });
  })
})

