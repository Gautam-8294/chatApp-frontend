import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:5000/",
    // baseURL: "https://vercel.live/link/chat-app-git-main-gautam-8294.vercel.app?via=deployment-domains-list-branch",
    baseURL: "https://chatapp-fqlj.onrender.com/",

})

export default instance;