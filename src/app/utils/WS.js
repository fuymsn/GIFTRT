export default class WS {
    constructor(url, dispatcher) {
        this.websocket = new WebSocket(url);
        this.dispatcher = dispatcher;
        this.websocket.onmessage = function(event) {
            dispatcher(event.data);
        }

        this.websocket.onopen = function(event) {
            console.log("WS is OPEN");
        }

        this.websocket.onerror = function(error) {
            console.log("WS ERROR: " + error);
        }
    }

    onOpenState(func) {
        this.websocket.onopen = function() {
            console.log("WS is OPEN");
            func();
        }
    }

    postMessage(text) {
        this.websocket.send(text);
    }

    close() {
        this.websocket.close();
    }
}