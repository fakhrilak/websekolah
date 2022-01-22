import axios from 'axios';
export const url = "http://192.168.10.170:4008"
export const API = axios.create({baseURL: url+`/be/v1/mansyuriyah`});
// Alter defaults after instance has been created
export const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common['Authorization'];
	}
};
export const path = url+"/be/v1/mansyuriyah/single/"
export const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};