import { io } from "socket.io-client";

export const socket = io("https://chat-lite-back.herokuapp.com/ ", {
  withCredentials: true,
});
