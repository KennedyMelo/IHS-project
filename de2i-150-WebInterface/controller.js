SWITCH_TURN_ON_IMG = "images/GreenRect.png"; 
SWITCH_TURN_OFF_IMG = "images/BlackRect.png"; 



const Switches = {
    getSwitch : (index) => {
        let switches = document.getElementById("switches");
        return switches.getElementsByTagName("td")[index]; 
    }, 

    turnOffSwitch : (index) => {
        let el= Switches.getSwitch(index);
        el.getElementsByTagName("img")[0].src = SWITCH_TURN_OFF_IMG;
    }, 

    turnOnSwitch : (index) => {
        let el = Switches.getSwitch(index);
        el.getElementsByTagName("img")[0].src = SWITCH_TURN_ON_IMG; 
    }, 

    turnOffAllSwitches: () =>  {
        for(let i = 0; i < 13; i++) {
            Switches.turnOffSwitch(i);
        }
    },
    
    updateSwitches: (state) => {
        for(let i = 0; i < state.length; i++) {
            if(state[i] == 1) {
                Switches.turnOnSwitch(i);
            } else {
                Switches.turnOffSwitch(i);
            }
        }
    }
}
const RedLeds = {
    getElement : (index) => {
        const redLedsTable = document.getElementById("redLeds");
        let led_row = redLedsTable.getElementsByTagName("tr")[(index >= 4)? 1 : 0];
        if(index>=4) index -= 4;
        let led = led_row.getElementsByTagName("td")[index]; 
        return led.getElementsByTagName("div")[0];
    },
    turnOff : (index) => {
        let led = RedLeds.getElement(index); 
        if(led.classList.contains("red")) {
            led.classList.remove("red"); 
            led.classList.add("darkRed");
        }
    }, 

    turnOn : (index) => {
        let led = RedLeds.getElement(index);
        if(led.classList.contains("darkRed")) {
            led.classList.remove("darkRed");
            led.classList.add("red");
        }
    },

    turnAll : (state) => {
        for(let i = 0; i < 8; i++) {
            if(state.toLowerCase() == "off") {
                RedLeds.turnOff(i);
            } else {
                RedLeds.turnOn(i); 
            }
        }
    }, 

    update : (state) => {
        for(let i = 0; i < state.length; i++) {
            if(state[i] == 1) {
                RedLeds.turnOn(i);
            } else {
                RedLeds.turnOff(i);
            }
        }
    }
}


const PushButtons = {
    getElement : (index) => {
        let push_buttons = document.getElementById("pushButtons"); 
        return push_buttons.getElementsByTagName("td")[index].getElementsByTagName("div")[0]; 
    },
    activate : (index) => {
        let push_button = PushButtons.getElement(index);
        if(push_button.classList.contains("white")) {
            push_button.classList.remove("white");
            push_button.classList.add("lightGreen");
        }
    },
    deactivate : (index) => {
        let push_button = PushButtons.getElement(index);
        if(push_button.classList.contains("lightGreen")) {
            push_button.classList.remove("lightGreen");
            push_button.classList.add("white");
        }
    },
    setAll : (func) => {
        for(let i = 0; i < 4; i++) {
            func(i);
        }
    },
    update(state) {
        for(let i = 0; i < state.length; i++) {
            if(state[i] == 1) {
                PushButtons.activate(i);
            } else {
                PushButtons.deactivate(i);
            }
        }
    }
}


const SDisplaySegmentOutp =  {
    getElement : () => {
        let display = document.getElementById("current_display"); 
        return display;
    },
    setText : (text) => {
        SDisplaySegmentOutp.getElement().innerText = text;
    }
}