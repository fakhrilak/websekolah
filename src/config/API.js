import axios from 'axios';
import SocketIO from  "socket.io-client"
export const url = "https://iot-service.zilog.tech"
export const API = axios.create({baseURL: url+`/be/v1/mansyuriyah`});

export let Socket = SocketIO("https://trymulti.zilog.club",{
    pingTimeout: 30000,
    pingInterval: 5000,
    upgradeTimeout: 30000, // default value is 10000ms, try changing it to 20k or more
})
// Alter defaults after instance has been created
export const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common['Authorization'];
	}
};
export const path = "https://trymulti.zilog.club/multiserver/v1/zilog/image/"
export const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};