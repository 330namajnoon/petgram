const myModules = require("./modules/myModules");
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const cors = require("cors");
const multer = require("multer");
const port = process.env.PORT || 4000;
const pdp = path.join(__dirname, "./mediya");
const app = express();
const fs = require("fs");
const { send } = require("process");
app.use(express.static(pdp));
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const mediyaUploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cd) => {
      cd(null, "./mediya");
    },
    filename: (req, file, cd) => {
      cd(null, file.originalname);
    }
  })
})
/////////////////// mysql connection
require("dotenv").config();
// const mysql = require("mysql");
const mysql = require("mysql2");
const { error } = require("console");


const connectionData = 'mysql://yumdq2b9vaoouo49bhbw:pscale_pw_dwX3VWPLWiuwZeKn9SEmEL8eZKHbcatUM0GbWkT60YW@aws.connect.psdb.cloud/petgram?ssl={"rejectUnauthorized":true}'









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
        SELECT * FROM views WHERE user_id = '${user_id}' && story_id = '${story_id}'
      `;
      const consult1 = `
          INSERT
          INTO views
          (user_id,story_id) VALUES ('${user_id}','${story_id}')
        `;


      connection.query(consult, (err, resp) => {
        if (err) {
          return;
        } else {
          if (resp.length <= 0) {
            connection.query(consult1, (err, resp1) => {
              if (err) {
                return;
              } else {
                io.emit(`view${story_id}`, { id: resp1.insertId, user_id, story_id });
              }
              connection.end();
            })
          }
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
      res.send({ error: err });
    } else {
      const consult = `SELECT user_id,pet_id,id FROM storys`;

      connection.query(consult, (err, resp) => {
        if (err) {
          res.send({ error: err });
        } else {
          let resp1 = [];
          for (let index = resp.length - 1; index >= 0; index--) {
            resp1.push(resp[index])
          }

          res.send({ data: resp1 });
          connection.end();
        }
      });
    }
  });
});

//////////////// server POSTS

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {
    const connection = mysql.createConnection(connectionData);
    connection.connect((err) => {
      if (err) {
        res.send({ error: err });
        connection.end();
      } else {
        const consult = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}' `;
        connection.query(consult, (err, resp) => {
          if (err) {
            res.send({ error: err });
            connection.end();
          } else {
            if (resp.length > 0) {
              let userData = resp[0];
              const consult1 = `
                SELECT f.follower_id as id,u.name,u.lastName,u.image
                FROM followers f
                JOIN users u
                ON f.follower_id = u.id AND f.type = 'fs'
                WHERE f.user_id = '${userData.id}'
              `;
              const consult2 = `
                SELECT f.follower_id as id,u.name,u.lastName,u.image
                FROM followers f
                JOIN users u
                ON f.follower_id = u.id AND f.type = 'fg'
                WHERE f.user_id = '${userData.id}'
              `;
              const consult3 = `
                SELECT f.follower_id as id,u.name,u.lastName,u.image
                FROM followers f
                JOIN users u
                ON f.follower_id = u.id AND f.type = 'pf'
                WHERE f.user_id = '${userData.id}'
              `;
              const consult4 = `
                SELECT s.id as story_id,s.pet_id
                FROM storys s
                WHERE s.user_id = '${userData.id}'
              `;
              const consult5 = `
                SELECT p.pet_id as id,u.id as user_id,p.name,p.birthDay,p.type,p.race,p.gender,p.description
                FROM pets p
                JOIN users u
                ON p.user_id = u.id
                WHERE p.user_id = '${userData.id}'
              `;
              connection.query(consult1, (err, resp2) => {
                if (err) {
                  res.send({ error: err });
                  connection.end();
                } else {
                  userData.followers = resp2;
                  connection.query(consult2, (err, resp3) => {
                    if (err) {
                      res.send({ error: err });
                      connection.end();
                    } else {
                      userData.following = resp3;
                      connection.query(consult3, (err, resp4) => {
                        if (err) {
                          res.send({ error: err });
                          connection.end();
                        } else {
                          userData.pendingFollowers = resp4;
                          connection.query(consult4, (err, resp5) => {
                            if (err) {
                              res.send({ error: err });
                              connection.end();
                            } else {
                              userData.storys = resp5;
                              connection.query(consult5, (err, resp6) => {
                                if (err) {
                                  res.send({ error: err });
                                  connection.end();
                                } else {
                                  userData.pets = resp6;
                                  res.send({ data: userData });
                                  connection.end();
                                };

                              });
                            };

                          });
                        };
                      });
                    };

                  });
                };

              });
            } else {
              res.send({ error: true });
              connection.end();
            }
          }
        });

      }
    });
  } else {
    res.send({ error: null });
    connection.end();
  }
});

app.post("/signup", mediyaUploader.single("file"), (req, res) => {
  const { id, email, name, lastName, birthDay, address, country, postalCode, phone, password, image, language, pets } = JSON.parse(req.body.user);
  console.log(JSON.parse(req.body.user));
  const connection = mysql.createConnection(connectionData);
  connection.query(`SELECT email FROM users WHERE email = '${email}'`, (err, resp1) => {
    if (resp1.length <= 0) {
      connection.query("SELECT id FROM users", (err, resp2) => {
        if (!err) {
          const newId = myModules.createNewUnikID(resp2, 10);
          const imageUrl = (image + `/${newId}.${req.file.originalname.split(".")[1]}`);
          const consult = `
          INSERT INTO users (id,email,name,lastName,birthDay,address,country,postalCode,phone,password,image,language)
          VALUES
          ('${newId}','${email}','${name}','${lastName}','${birthDay}','${address}',${country},${postalCode},${phone},'${password}','${imageUrl}','${language}')
          `;
          connection.query(consult, (err, resp3) => {
            if (!err) {
              try {
                fs.renameSync(`./mediya/${req.file.originalname}`, `./mediya/${newId}.${req.file.originalname.split(".")[1]}`);
                connection.query("SELECT pet_id as id FROM pets", (err, resp4) => {
                  if (!err) {
                    const { name, birthDay, type, race, gender, description } = pets[0];
                    let newPetId = myModules.createNewUnikID(resp4, 10);
                    const consult = `
                      INSERT INTO pets (pet_id,user_id,name,birthDay,type,race,gender,description)
                      VALUES
                      ('${newPetId}','${newId}','${name}','${birthDay}',${type},${race},'${gender}','${description}')
                    `;
                    connection.query(consult,(err,resp5)=> {
                      if(!err){
                        res.send({ data: email });
                        connection.end();
                      }else {
                        console.log(err);
                        res.send({ error: "server_error_5" })
                        connection.end();
                      }
                    })

                  } else {
                    res.send({ error: "server_error_4" })
                    connection.end();
                  }


                })
              } catch (error) {
                res.send({ error: "server_error_3" })
                connection.end();
              }
            } else {
              console.log(err);
              res.send({ error: "server_error_2" })
              connection.end();
            }
          })
        } else {
          res.send({ error: "server_error_1" })
          connection.end();
        }
      })
    } else {
      res.send({ error: "this_user_exists" });
      connection.end();
    }
  })
})

app.post("/saveStory", mediyaUploader.single("file"), (req, res) => {
  const fileType = req.file.originalname.split(".")[1];
  const newStory = JSON.parse(req.body.story);
  const conection = mysql.createConnection(connectionData);
  conection.connect((err) => {
    if (err) {
      res.send({ error: err });
      conection.end();
    } else {
      conection.query("SELECT id FROM storys", (err, resp) => {
        if (err) {
          res.send({ error: err });
          conection.end();
        } else {
          newStory.id = myModules.createNewUnikID(resp, 10);
          let fileNewRoute = `${newStory.id}.${fileType}`;
          newStory.url += `/${fileNewRoute}`;

          fs.renameSync(`./mediya/${req.file.originalname}`, `./mediya/${fileNewRoute}`);

          const consult = `
            INSERT 
            INTO storys 
            (id,pet_id,user_id,url,type,description)
            VALUES
            ('${newStory.id}','${newStory.pet}','${newStory.user_id}','${newStory.url}','${newStory.type}','${newStory.description}')
          `;
          conection.query(consult, (err, resp1) => {
            if (err) {
              res.send({ error: err });
              conection.end();
            } else {
              res.send({ data: newStory });
              conection.end();
            }
          })
        }
      })
    }
  })
})
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
        s.type,
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
      res.send({ error: err });
      connection.end();
      return;
    }
    connection.query(consult2, (err, res2) => {
      if (err) {
        res.send({ error: err });
        connection.end();
        return;
      }

      connection.query(consult3, (err, res3) => {
        if (err) {
          res.send({ error: err });
          connection.end();
          return;
        }

        connection.query(consult4, (err, res4) => {
          if (err) {
            res.send({ error: err });
            connection.end();
            return;
          }
          const story = res1[0];
          story.comments = res2;
          story.likes = res3;
          story.views = res4;
          res.send({ data: story });
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
  if (req.body.user) {
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
      if (err) {
        res.send({ error: err });
        conneccion.end();
      } else {
        let userData = resp1[0];
        conneccion.query(consult1, (err, resp2) => {
          if (err) {
            res.send({ error: err })
            conneccion.end();
          } else {
            userData.followers = resp2;
            conneccion.query(consult2, (err, resp3) => {
              if (err) {
                res.send({ error: err })
                conneccion.end();
              } else {
                userData.following = resp3;
                conneccion.query(consult3, (err, resp4) => {
                  if (err) {
                    res.send({ error: err })
                    conneccion.end();
                  } else {
                    userData.pendingFollowers = resp4;
                    conneccion.query(consult4, (err, resp5) => {
                      if (err) {
                        res.send({ error: err })
                        conneccion.end();
                      } else {
                        userData.storys = resp5;
                        conneccion.query(consult5, (err, resp6) => {
                          if (err) {
                            res.send({ error: err })
                            conneccion.end();
                          } else {
                            userData.pets = resp6;
                            res.send({ data: userData });
                            conneccion.end();
                          };
                        });
                      };
                    });
                  };
                });
              };
            });
          };
        });
      }
    });
  } else {
    res.send({ error: true });
    conneccion.end();
  }
});

app.post("/updateData", (req, res) => {
  res.send(req.body);
})
app.get("/getUsers", (req, res) => {

  const connection = mysql.createConnection(connectionData);
  connection.connect((err) => {
    if (!err) {
      connection.query("SELECT * FROM users", (err, resp) => {
        if (!err) {
          console.log(resp)
          res.send(resp);
        }
      })
    }
  })
})

app.get("/languages", (req, res) => {
  const connection = mysql.createConnection(connectionData);
  connection.connect((err) => {
    if (!err) {
      connection.query("SELECT language FROM languages", (err, resp) => {
        if (!err) {
          res.send({ data: resp.map(l => l = l.language) });
          connection.end();
        } else {
          res.send({ error: "server_error" });
          connection.end();
        }
      })
    } else {
      res.send({ error: "server_error" });
      connection.end();
    }
  })
})

app.post("/races", (req, res) => {
  const connection = mysql.createConnection(connectionData);
  connection.connect((err) => {
    if (!err) {
      connection.query(`SELECT id,race FROM races WHERE language = '${req.body.language}' && type_id = ${req.body.id}`, (err, resp) => {
        if (!err) {
          res.send({ data: resp });
          connection.end();
        } else {
          res.send({ error: "server_error" });
          connection.end();
        }
      })
    } else {
      res.send({ error: "server_error" });
      connection.end();
    }
  })
})

app.post("/types", (req, res) => {
  const connection = mysql.createConnection(connectionData);
  connection.connect((err) => {
    if (!err) {
      connection.query(`SELECT id,type FROM types WHERE language = '${req.body.language}'`, (err, resp) => {
        if (!err) {
          res.send({ data: resp });
          connection.end();
        } else {
          res.send({ error: "server_error" });
          connection.end();
        }
      })
    } else {
      res.send({ error: "server_error" });
      connection.end();
    }
  })
})

app.post("/countrys", (req, res) => {
  const connection = mysql.createConnection(connectionData);
  connection.connect((err) => {
    if (!err) {
      connection.query(`SELECT id,country FROM countrys WHERE language = '${req.body.language}'`, (err, resp) => {
        if (!err) {
          res.send({ data: resp });
          connection.end();
        } else {
          console.log("lsdfnslf")
          res.send({ error: "server_error" });
          connection.end();
        }
      })
    } else {
      res.send({ error: "server_error" });
      connection.end();
    }
  })
})