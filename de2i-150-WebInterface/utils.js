function buildCommand(component, index, state) {
    return `{"component": "${component}", 
        "index" :${index}, 
        "state" : ${state}}`; 
}