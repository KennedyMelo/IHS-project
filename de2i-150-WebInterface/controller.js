SWITCH_TURN_ON_IMG = "images/GreenRect.png"; 
SWITCH_TURN_OFF_IMG = "images/BlackRect.png"; 



const Switches = {
    getSwitch : (index) => {
        let switches = document.getElementById("switches");
        return switches.getElementsByTagName("td")[index]; 
    }, 

    turnOff : (index) => {
        let el= Switches.getSwitch(index);
        el.getElementsByTagName("img")[0].src = SWITCH_TURN_OFF_IMG;
    }, 

    turnOn : (index) => {
        let el = Switches.getSwitch(index);
        el.getElementsByTagName("img")[0].src = SWITCH_TURN_ON_IMG; 
    }, 

    turnOffAll: () =>  {
        for(let i = 0; i < 17; i++) {
            Switches.turnOff(i);
        }
    },
    
    update: (state) => {
        for(let i = 0; i < state.length; i++) {
            if(state[i] == 1) {
                Switches.turnOn(i);
            } else {
                Switches.turnOff(i);
            }
        }
    }
}

const RedLeds = {
    status : new Array(18),
    getElement : (index) => {
        const redLedsTable = document.getElementById("redLeds");
        let led_row = redLedsTable.getElementsByTagName("tr")[(index < 5) ? 0 : (index < 10) ? 1 : (index < 15) ? 2 : 3];
        let led = led_row.getElementsByTagName("td")[index % 5]; 
        return led.getElementsByTagName("div")[0];
    },
    turnOff : (index) => {
        RedLeds.status[index] = 0;
        let led = RedLeds.getElement(index); 
        if(led.classList.contains("red")) {
            led.classList.remove("red"); 
            led.classList.add("darkRed");
        }
    }, 

    turnOn : (index) => {
        RedLeds.status[index] = 1;
        let led = RedLeds.getElement(index);
        if(led.classList.contains("darkRed")) {
            led.classList.remove("darkRed");
            led.classList.add("red");
        }
    },
    isOn : (index) => {
        let led = RedLeds.getElement(index);
        if(led.classList.contains("red")) {
            return true;
        }
        return false;
    },

    turnAll : (state) => {
        for(let i = 0; i < 17; i++) {
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
    },

    switch : (index) => {
        let new_state;
        if(RedLeds.isOn(index)) {
            RedLeds.turnOff(index);
            new_state = 0;
        } else {
            RedLeds.turnOn(index);
            new_state = 1;
        }
        socket.send(buildCommand("red_leds",index, new_state));
    }
}


const GreenLeds = {
    status : new Array(8),
    getElement : (index) => {
        const greenLedsTable = document.getElementById("greenLeds");
        let led_row = greenLedsTable.getElementsByTagName("tr")[index < 4 ? 0 : 1];
        let led = led_row.getElementsByTagName("td")[index % 4]; 
        return led.getElementsByTagName("div")[0];
    },
    turnOff : (index) => {
        GreenLeds.status[index] = 0;
        let led = GreenLeds.getElement(index); 
        if(led.classList.contains("green")) {
            led.classList.remove("green"); 
            led.classList.add("darkGreen");
        }
    }, 

    turnOn : (index) => {
        GreenLeds.status[index] = 1;
        let led = GreenLeds.getElement(index);
        if(led.classList.contains("darkGreen")) {
            led.classList.remove("darkGreen");
            led.classList.add("green");
        }
    },
    isOn : (index) => {
        let led = GreenLeds.getElement(index);
        if(led.classList.contains("green")) {
            return true;
        }
        return false;
    },

    turnAll : (state) => {
        for(let i = 0; i < 8; i++) {
            if(state.toLowerCase() == "off") {
                GreenLeds.turnOff(i);
            } else {
                GreenLeds.turnOn(i); 
            }
        }
    }, 

    update : (state) => {
        for(let i = 0; i < state.length; i++) {
            if(state[i] == 1) {
                GreenLeds.turnOn(i);
            } else {
                GreenLeds.turnOff(i);
            }
        }
    },

    switch : (index) => {
        let new_state;
        if(GreenLeds.isOn(index)) {
            GreenLeds.turnOff(index);
            new_state = 0;
        } else {
            GreenLeds.turnOn(index);
            new_state = 1;
        }
        socket.send(buildCommand("green_leds",index, new_state));
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
