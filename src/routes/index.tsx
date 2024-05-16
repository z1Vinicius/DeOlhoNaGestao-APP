import React, { useEffect, useState } from "react";
import BottomRoutes from "./main.bottom.routes";
import AuthRoutes from "./auth.stack.routes";
import database from "../db/infra/db/settings/connection";
import useStoreAuth from "src/stores/login";

function Routes() {
	const [isAuth, setAuth] = useState(false);
	const receiveEvent = useStoreAuth((state) => state.eventCounter);

	async function checkAuth() {
		if (await database.localStorage.get("auth.access")) {
			setAuth(true);
		}
		return false;
	}

	useEffect(() => {
		// setAuth(false);
		console.log("Verificou");

		checkAuth();
		return () => {};
	}, [receiveEvent]);

	if (isAuth) {
		return <BottomRoutes />;
	}
	return <AuthRoutes />;
}

export default Routes;
