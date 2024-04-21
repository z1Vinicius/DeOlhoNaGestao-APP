import axios from "axios";

const url = "http://192.168.18.3:8000";

const api = axios.create({
	timeout: 6000,
	baseURL: url,
});

// const setStorageToken = async () => {
// 	const token = await database.localStorage.get("auth.token");
// 	if (token) {
// 		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// 	}
// };

// setStorageToken();

export { url };
export default api;
