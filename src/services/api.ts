import axios from "axios";
import database from "../db/infra/db/settings/connection";

const url = "http://192.168.18.22:8000";

const api = axios.create({
	timeout: 1500,
	baseURL: url,
});

const setStorageToken = async () => {
	const token = await database.localStorage.get("auth.access");
	if (token) {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
};

setStorageToken();

export { setStorageToken, url };
export default api;
