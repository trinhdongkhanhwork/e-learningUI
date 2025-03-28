import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export default function connectSocket(){
    return new Promise((resolve, reject) => {
        stompClient = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            onConnect: () => {
                resolve(stompClient); 
            },
            onStompError: (frame) => {
                reject(frame);
            },
        })
        stompClient.activate();
    })
}

export function getStompClient() {
    return stompClient;
}
