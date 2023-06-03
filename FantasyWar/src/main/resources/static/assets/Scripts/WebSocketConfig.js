var gamescene;
var myId;
var sent = false;
var socket = new WebSocket("ws://localhost:8080/echo");
socket.onopen = function(event) {
    //console.log("Connected to server");
    
}

socket.onmessage = function(event) {
    console.log("Received message from server: " + event.data);
    if(JSON.parse(event.data).type == "chat"){
        gamescene.ReceiveMessage(JSON.parse(event.data)["body"]);
    }
    if(JSON.parse(event.data).type == "user"){
        gamescene.addPlayer(JSON.parse(event.data)["body"]);
        if(!sent){
            return;
        }
        if(myId == undefined){
            myId=JSON.parse(event.data)["body"];
            sent = false;
        }
        //console.log(myId);
    }
    if(JSON.parse(event.data).type == "unidad"){
        if(JSON.parse(event.data).player == 1){
            gamescene.player1.Instanciate(JSON.parse(event.data).unidad, JSON.parse(event.data).camino);
        }else if(JSON.parse(event.data).player == 2){
            gamescene.player2.Instanciate(JSON.parse(event.data).unidad, JSON.parse(event.data).camino);
        }
    }
}

socket.onclose = function(event) {
    //console.log("Disconnected from server");
}

function SendMessage(type, msg){
    //console.log(msg);
    sent = true;
    socket.send(JSON.stringify({type:type, body: msg}))
}


// Send a message to the server
