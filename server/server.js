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
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

/////////////////// mysql connection
require("dotenv").config();
// const mysql = require("mysql");
const mysql = require("mysql2");
const connectionData = 'mysql://v4rbuubil20bo9oicoed:pscale_pw_HX1zsxVd7gctjiRpqCgSd5HxK0brZ434mkzW60bVOP0@aws.connect.psdb.cloud/petgram?ssl={"rejectUnauthorized":true}';


 

////////////// server listener

server.listen(port, () => {
  console.log(`server is up on port ${port}!`);
  
  

});

/////////////////  Socket.io connection

io.on("connect", (client) => {
  console.log("new connect");
  
  client.on("comment", (comment) => {
    const connection = mysql.createConnection(connectionData);
    connection.connect((err) => {
      if (err) return;
      const consult = `
          INSERT
          INTO comments
          (user_id,story_id,fullName,comment,date,time) VALUES ('${comment.user_id}','${comment.story_id}','${comment.fullName}','${comment.comment}','${comment.date}','${comment.time}')
        `;

      connection.query(consult, (err, resp) => {
        if (err) {
          return;
        } else {
          io.emit(`comment${comment.story_id}`, {
            id: resp.insertId,
            user_id: comment.user_id,
            story_id: comment.story_id,
            fullName: comment.fullName,
            comment: comment.comment,
            date: comment.date,
            time: comment.time,
          });
        }
      });
    });
  });

  client.on("like", (story_id, user_id) => {
    const connection = mysql.createConnection(connectionData);
    connection.connect((err) => {
      if (err) return;
      const consult = `
          INSERT
          INTO likes
          (user_id,story_id) VALUES ('${user_id}','${story_id}')
        `;

      connection.query(consult, (err, resp) => {
        if (err) {
          return;
        } else {
          io.emit(`like${story_id}`, { id: resp.insertId, user_id, story_id });
        }
      });
    });
  });

  client.on("view", (story_id, user_id) => {
    const connection = mysql.createConnection(connectionData);
    connection.connect((err) => {
      if (err) return;
      const consult = `
          INSERT
          INTO views
          (user_id,story_id) VALUES ('${user_id}','${story_id}')
        `;

      connection.query(consult, (err, resp) => {
        if (err) {
          return;
        } else {
          io.emit(`view${story_id}`, { id: resp.insertId, user_id, story_id });
        }
      });
    });
  });

  client.on("disconnect", () => {
    console.log("new disconnect");
  });
});

////////////////  server GETS

app.get("/storysLink", (req, res) => {
  let connection = mysql.createConnection(connectionData);
  connection.connect((err) => {
    if (err) {
      res.send(err);
    } else {
      const consult = `SELECT user_id,pet_id,id FROM storys`;

      connection.query(consult, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          res.send(resp);
        }
      });
      connection.end();
    }
  });
});

//////////////// server POSTS

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let connection = mysql.createConnection(connectionData);
  connection.connect((err) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      const consult = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}' `;

      connection.query(consult, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          res.send(resp);
        }
      });
      connection.end();
    }
  });
});
// app.post("/downloadStorys",multer().none(),(req,res)=> {

//   try {
//     fs.readFile("./database/usersData.json",(err,data)=> {
//       if(err) throw err;
//       const usersData = JSON.parse(data.toString());
//       res.send(JSON.stringify(usersData.storys));
//     })
//   } catch (error) {
//     res.send(error);
//   }
// })

/////////////////  story download

app.post("/downloadStory", (req, res) => {
  const user_id = req.body.user_id;
  const id = req.body.id;
  const pet_id = req.body.pet_id;

  let connection = mysql.createConnection(connectionData);
  connection.connect();
  const consult1 = `
        SELECT s.id , 
        s.user_id , 
        CONCAT(u.name,' ',u.lastName) as 'fullName',
        u.image as 'profileImage',
        s.url,
        s.description
        FROM storys s
        JOIN users u
        ON u.id = s.user_id
        WHERE s.id = '${id}' && s.pet_id = '${pet_id}' && s.user_id = '${user_id}'
      `;
  const consult2 = `
      SELECT *
      FROM comments
      WHERE story_id = '${id}'
      `;
  const consult3 = `
      SELECT *
      FROM likes
      WHERE story_id = '${id}'
      `;
  const consult4 = `
      SELECT *
      FROM views
      WHERE story_id = '${id}'
      `;
  connection.query(consult1, (err, res1) => {
    if (err) {
      res.send(err);
      return;
    }
    connection.query(consult2, (err, res2) => {
      if (err) {
        res.send(err);
        return;
      }

      connection.query(consult3, (err, res3) => {
        if (err) {
          res.send(err);
          return;
        }

        connection.query(consult4, (err, res4) => {
          if (err) {
            res.send(err);
            return;
          }
          const story = res1[0];
          story.comments = res2;
          story.likes = res3;
          story.views = res4;
          res.send(story);
          connection.end();
        });

      });
    });
  });
});
app.post("/downloadComments", multer().none(), (req, res) => {
  try {
    fs.readFile(
      `./database/${req.body.user}/commends/${req.body.storyId}.json`,
      (err, data) => {
        if (err) throw err;
        res.send(data.toString());
      }
    );
  } catch (error) {
    res.send(error);
  }
});
app.post("/profileData", multer().none(), (req, res) => {
  const conneccion = mysql.createConnection(connectionData);
  conneccion.connect();

  const consult = `
      SELECT u.id,CONCAT(u.name,' ',u.lastName) as fullName,u.image
      FROM users u
      WHERE id = '${req.body.user}'
    `;
  const consult1 = `
      SELECT f.follower_id as id,u.name,u.lastName,u.image
      FROM followers f
      JOIN users u
      ON f.follower_id = u.id AND f.type = 'fs'
      WHERE f.user_id = '${req.body.user}'
    `;

  const consult2 = `
      SELECT f.follower_id as id,u.name,u.lastName,u.image
      FROM followers f
      JOIN users u
      ON f.follower_id = u.id AND f.type = 'fg'
      WHERE f.user_id = '${req.body.user}'
    `;
  const consult3 = `
      SELECT f.follower_id as id,u.name,u.lastName,u.image
      FROM followers f
      JOIN users u
      ON f.follower_id = u.id AND f.type = 'pf'
      WHERE f.user_id = '${req.body.user}'
    `;
  const consult4 = `
    SELECT s.id as story_id,s.pet_id
    FROM storys s
    WHERE s.user_id = '${req.body.user}'
  `;
  const consult5 = `
    SELECT p.pet_id as id,u.id as user_id,p.name,p.birthDay,p.type,p.race,p.gender,p.description
    FROM pets p
    JOIN users u
    ON p.user_id = u.id
    WHERE p.user_id = '${req.body.user}'
  `;
  conneccion.query(consult, (err, resp1) => {
    if (err) throw err;
    let userData = resp1[0];
    conneccion.query(consult1, (err, resp2) => {
      if (err) throw err;
      userData.followers = resp2;
      conneccion.query(consult2, (err, resp3) => {
        if (err) throw err;
        userData.following = resp3;
        conneccion.query(consult3, (err, resp4) => {
          if (err) throw err;
          userData.pendingFollowers = resp4;
          conneccion.query(consult4, (err, resp5) => {
            if (err) throw err;
            userData.storys = resp5;
            conneccion.query(consult5, (err, resp6) => {
              if (err) throw err;
              userData.pets = resp6;
              res.send(userData);
              conneccion.end();
            });
          });
        });
      });
    });
  });
});
