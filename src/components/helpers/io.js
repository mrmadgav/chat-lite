import { io } from "socket.io-client";

export const socket = io("https://chat-lite-two.vercel.app/", {
  withCredentials: true,
});
// https://chat-lite-back.herokuapp.com/