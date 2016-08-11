export default class WS {
    constructor(url, dispatcher) {
        this.websocket = new WebSocket(url);
        this.dispatcher = dispatcher;
        this.websocket.onmessage = function(event) {
            dispatcher(event.msg);
        }
    }

    postMessage(text) {
        this.websocket.send(text);
    }

    close(){
        this.websocket.close();
    }
}