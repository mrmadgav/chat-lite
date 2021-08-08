import { io } from "socket.io-client";

export const socket = io("https://chat-lite-back.herokuapp.com", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
// https://chat-lite-back.herokuapp.com/
