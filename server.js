const mysql = require('mysql2');
const util = require('util');
const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb+srv://hpavlo140904:QYb2d9UDcmsvsGh9@clustername.k3fajtx.mongodb.net/?retryWrites=true&w=majority');
client.connect();

const db = client.db("ClusterName");
let messages = db.collection('Messages');


let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

server.listen(8080);

let availableUsers = [];
let users = [];
let connections = [];

fillChatUsers();
app.get('/chat', async function (req, res) {
    let nameParam = req.query.username;
    users.push(nameParam);
    availableUsers = [];
    await fillChatUsers();
    console.log("available users " + availableUsers);
    if (availableUsers.find(username => username === nameParam) === undefined) {
        res.redirect(  '/registrationForm');
        return;
    }
    let urlToFile = 'C:\\xampp\\htdocs\\Lab01PVI\\chat.html';
    res.sendFile(urlToFile);
});
app.get('/registrationForm', async function (req, res) {
    let urlToFile = 'C:\\xampp\\htdocs\\Lab01PVI\\htmlFiles\\LogInForm.html';
    res.sendFile(urlToFile);
});

io.sockets.on('connection', function (socket) {
    connections.push(socket);
    socket.on("settingUser", function (user) {
        if (users.find(username => username === user) === undefined) {
            users.push(user);
        }
        socket.on('disconnect', function (data) {
            connections.splice(connections.indexOf(socket), 1);
            users = users.filter(function (item) {
                return item !== user;
            });
        });
    });
    socket.emit("getAllChats", availableUsers);
    socket.on("reqLastChatMessage", async function(userFrom,userTo){
        let messagesArray = await messages.find({
            $or: [
                { from: userFrom, to: userTo },
                { from: userTo, to: userFrom }
            ]
        }).toArray();
        console.log(messagesArray);
        let lMessage = null;
        if(messagesArray.length > 0) lMessage = messagesArray[messagesArray.length - 1];
        socket.emit("getLastChatMessage", lMessage);
    });

    socket.on('sendMessage', function (data, username, userTo) {
        messages.insertOne({
            from: username,
            to: userTo,
            message: data
        });
        io.sockets.emit('addMessage', {msg: data, username: username, userTo: userTo});
    });
    socket.on('sendMessagesBySenderAndReceiver', async function (username, userTo) {
        console.log("User from " + username + " user to " + userTo);
        let filteredMessages;
        if (userTo === "All") {
            messages.find();
            filteredMessages = await messages.find({to: {$eq: "All"}}).toArray();

        } else {
            filteredMessages = await messages.find({
                $or: [
                    {from: username, to: userTo},
                    {from: userTo, to: username}
                ]
            }).toArray();
        }
        console.log(filteredMessages);
        socket.emit("getMessagesBySenderAndReceiver", filteredMessages);
    });
});
async function fillChatUsers() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'MyDataBase_PVI'
    });

    connection.connect(function (err) {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return;
        }
        console.log('Підключено до бази даних з ID: ' + connection.threadId);
    });

    const sqlQuery = 'SELECT * FROM Students';
    const query = util.promisify(connection.query).bind(connection);
    const results = await query(sqlQuery);

    results.forEach(function (row) {
        availableUsers.push(row.name);
    });

    connection.end();
}
