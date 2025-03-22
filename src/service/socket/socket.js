import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export function connectSocket(){
    return new Promise((resolve, reject) => {
        stompClient = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            onConnect: () => {
                resolve(); 
            },
            onStompError: (frame) => {
                reject(frame);
            },
        })
        stompClient.activate();
    })
}
