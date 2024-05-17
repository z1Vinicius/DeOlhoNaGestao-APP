import { useState, useEffect, useRef } from "react";
import database from "src/db/infra/db/settings/connection";
import { IAuthProfile } from "src/interfaces/auth";
import useStoreAuth from "src/stores/login";
import Toast from "react-native-toast-message";

function ProfileViewModel() {
	const [firstName, setFirstName] = useState("Olho");
	const [lastName, setLastName] = useState("Gestão");
	const [isLoading, setLoading] = useState(false);
	const updateLogin = useStoreAuth((state) => state.emitEvent);

	const handleLogout = async () => {
		if (!isLoading) {
			setLoading(true);
			try {
				await database.localStorage.remove("auth.access");
				await database.localStorage.remove("auth.refresh");
				await database.localStorage.remove("auth.profile");
				updateLogin();
				Toast.show({
					type: "showSuccess",
					text1: "Foi bom ter ver por aqui",
					text2: "Até a próxima! 🤗",
					position: "bottom",
				});
			} catch {
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		const getName = async () => {
			const data = (await database.localStorage.get("auth.profile")) as string;
			if (data) {
				const parse = JSON.parse(data) as IAuthProfile["data"];
				setFirstName(parse.firstName as string);
				setLastName(parse.lastName as string);
			}
		};
		getName();
	}, []);

	return {
		firstName,
		lastName,
		isLoading,
		handleLogout,
	};
}

export default ProfileViewModel;
