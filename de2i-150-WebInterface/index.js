const socket = new WebSocket("ws://localhost:3001");

socket.addEventListener('open', function (event) {

    socket.send('Client connected to server');

});


let last_state = null; 
socket.addEventListener('message', function (event) {
    last_state = JSON.parse(event.data)
    updateInterface(); 
});
socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};

SWITCH_TURN_ON_IMG = "images/GreenRect.png"; 
SWITCH_TURN_OFF_IMG = "images/BlackRect.png"; 




document.addEventListener('DOMContentLoaded', ()=> {
    initInterface();
    console.log(JSON.stringify(last_state));
})


function send7SegmentText(e){
        e.preventDefault()
        socket.send(document.getElementById("7SdisplayForm").value)
}



function updateInterface() {

    if(last_state == null) return; 
    Switches.updateSwitches(last_state["switches"]);
    //RedLeds.update(last_state["red_leds"]);
    PushButtons.update(last_state["push_button"]);
    SDisplaySegmentOutp.setText(last_state["display_left"]);
}

function initInterface() {
    Switches.turnOffAllSwitches();
    RedLeds.turnAll("off");
    PushButtons.activate(0);
    PushButtons.setAll(PushButtons.deactivate);
    SDisplaySegmentOutp.getElement();
}

