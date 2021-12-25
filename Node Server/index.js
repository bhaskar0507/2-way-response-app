//Server Which will handle socket io connections--

const io = require("socket.io")(8000);

const users = {};
//For every New Connection that function Listen--
io.on("connection", (socket) => {
  //When New User Joined the chat----

  socket.on("new-user-joined", (name) => {
    // console.log("New User",name)
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  //When Some one send some message--------

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
  //When User Leave from the room--

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
