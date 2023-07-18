import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:5000/",
    baseURL: "https://chat-app-gautam-8294.vercel.app/",

})

export default instance;