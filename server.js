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
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
server.listen(port, () => {
  console.log(`server is up on port ${port}!`);
});

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
app.post("/login",multer().none(),(req,res)=> {
  let user = JSON.parse(req.body.user);
  fs.readFile(`./database/usersData.json`,(err,data)=> {
    if(err) throw err;
    let users = JSON.parse(data.toString()).users;
    let search = users.find(u => u == user.user);
    if(search) {
      fs.readFile(`./database/${user.user}/userData.json`,(err,data)=> {
        if(err) throw err;
        let userData = JSON.parse(data.toString());
        if(user.user == userData.user && user.password == userData.password) {
          let {user,userName,email} = userData;
          let newuserData = {
            user,
            userName,
            email
          }
          res.send(JSON.stringify(newuserData));
        }else {
          res.send(JSON.stringify(false));
        }
      })
    }else {
      res.send(JSON.stringify(false));
    }
  });

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
    let {user,userName,profileImage,storys,followers,following,pets} = JSON.parse(data.toString());
    res.send(JSON.stringify({user,userName,profileImage,storys,followers,following,pets}));
  })
})

