
import Central from './utilities/Central';
const API_BASE_URL = Central.API + "/api/start";

export const StartService = {
	async CrearBase() {
		try {
			const response = await fetch(API_BASE_URL, {
				method: "POST"
			});
			console.log("Código de respuesta: " + response.status);
			const text = await response.text();
			console.log("Respuesta: " + text);
		} catch (e) {
			console.error(e.stack);
		}
	},

	async getCredenciales() {
		try {
			const response = await fetch(API_BASE_URL + "/chat", {
				method: "GET"
			});
			if (response.status === 200) {
				let body = await response.text();
				body = body.replace("[", "").replace("]", "").replace(/"/g, "");
				return body.split(",");
			} else {
				console.log("Error al obtener credenciales. Código: " + response.status);
			}
		} catch (e) {
			console.error(e.stack);
			return ["192.168.1.2", "8080", "1234"]; 
		}	
	}
};
