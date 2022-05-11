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
    status : new Array(8),
    getElement : (index) => {
        const redLedsTable = document.getElementById("redLeds");
        let led_row = redLedsTable.getElementsByTagName("tr")[(index >= 4)? 1:0];
        let led = led_row.getElementsByTagName("td")[index % 4]; 
        return led.getElementsByTagName("div")[0];
    },
    turnOff : (index) => {
        RedLeds.status[index] = 0;
        console.log(RedLeds.status);
        let led = RedLeds.getElement(index); 
        if(led.classList.contains("red")) {
            led.classList.remove("red"); 
            led.classList.add("darkRed");
        }
    }, 

    turnOn : (index) => {
        RedLeds.status[index] = 1;
        console.log(RedLeds.status);
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
    },

    switch : (index) => {
        if(RedLeds.isOn(index)) {
            RedLeds.turnOff(index);
            socket.send(buildCommand("red_led",index,0)); 
        } else {
            RedLeds.turnOn(index);
            socket.send(buildCommand("red_led", index,1));
        }
    }
}

const GreenLeds = {
    OffColor : "darkGreen", 
    OnColor : "lightGreen", 
    getElement : (index) => {
        let green_leds_rows = document.getElementById("greenLeds").getElementsByTagName("tr");
        let green_led_row; 
        let row_len = 5;
        if(index < 5) {
            green_led_row = green_leds_rows[0].getElementsByTagName("td");
        }
        else if(index < 10) {
            green_led_row = green_leds_rows[1].getElementsByTagName("td");
        }
        else if(index < 15) {
            green_led_row = green_leds_rows[2].getElementsByTagName("td");
        }
        else {
            green_led_row = green_leds_rows[3].getElementsByTagName("td");
            row_len = 2; 
        }
        return  green_led_row[index % row_len].getElementsByTagName("div")[0];
    }, 
    turnOff : (index) => {
        let green_led = GreenLeds.getElement(index); 
        if(green_led.classList.contains(GreenLeds.OnColor)) {
            green_led.classList.remove(GreenLeds.OnColor); 
            green_led.classList.add(GreenLeds.OffColor); 
        }
    },
    turnOn : (index) => {
        let green_led = GreenLeds.getElement(index); 
        if(green_led.classList.contains(GreenLeds.OffColor)) {
            green_led.classList.remove(GreenLeds.OffColor); 
            green_led.classList.add(GreenLeds.OnColor); 
        }
    },
    isOn : (index) => {
        if(GreenLeds.getElement(index).classList.contains(GreenLeds.OnColor)) {
            return true;
        }
        return false; 
    },
    setAll : (func) => {
        for(let i = 0; i < 17; i++) {
            func(i); 
        }
    }, 
    switch : (index) => {
        let new_state = 0; 
        if(GreenLeds.isOn(index)) {
            GreenLeds.turnOff(index);
            new_state = 0;
        } else {
            GreenLeds.turnOn(index);
            new_state = 1;  
        }
        socket.send(buildCommand("green_led", index,new_state));
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