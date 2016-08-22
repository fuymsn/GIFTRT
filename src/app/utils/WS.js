export default class WS {
    constructor(url, dispatcher) {
        this.websocket = new WebSocket(url);
        this.dispatcher = dispatcher;
        this.websocket.onmessage = function(event) {
            dispatcher(event.msg);
        }

        this.websocket.onopen = function(event) {
            console.log("WebSocket is OPEN");
        }

        this.websocket.onerror = function(error) {
            console.log("WebSocket ERROR: " + error);
        }
    }

    postMessage(text) {
        this.websocket.send(text);
    }

    close(){
        this.websocket.close();
    }
}