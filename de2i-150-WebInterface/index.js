const socket = new WebSocket("ws://localhost:3001");

socket.addEventListener('open', function (event) {

    socket.send('connected');

});

let last_state = null; 
socket.addEventListener('message', function (event) {
    last_state = JSON.parse(event.data);
    updateInterface(); 
});
socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};


document.addEventListener('DOMContentLoaded', ()=> {
    initInterface();
    //console.log(JSON.stringify(last_state));
})


function send7SegmentText(e){
        e.preventDefault();
        //console.log("sending new txt");
        //console.log("SevenSegment",document.getElementById("7SdisplayForm").value);
        socket.send(buildCommand(
            "display_left", 
            0,document.getElementById("7SdisplayForm").value
        ))
        document.getElementById("7SdisplayForm").value = "";
}



function updateInterface() {

    if(last_state == null) return; 
    Switches.update(last_state["switches"]);
    //RedLeds.update(last_state["red_leds"]);
    PushButtons.update(last_state["push_button"]);
    SDisplaySegmentOutp.setText(last_state["display_left"]);
    RedLeds.update(last_state["red_leds"])
    GreenLeds.update(last_state["green_leds"])
    
}

function initInterface() {
    Switches.turnOffAll();
    RedLeds.turnAll("off");
    GreenLeds.turnAll("off"); 
    //GreenLeds.setAll(GreenLeds.turnOff); 

    PushButtons.activate(0);
    PushButtons.setAll(PushButtons.deactivate);
    SDisplaySegmentOutp.setText("");



}

