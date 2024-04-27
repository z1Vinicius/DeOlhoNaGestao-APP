import React, { useEffect, useState } from "react";
import BottomRoutes from "./main.bottom.routes";
import AuthRoutes from "./auth.stack.routes";
import database from "../db/infra/db/settings/connection";

function Routes() {
	const [isAuth, setAuth] = useState(false);

	useEffect(() => {
		async function checkAuth() {
			if (await database.localStorage.get("auth.access")) {
				setAuth(true);
			}
			return false;
		}
		setAuth(false);

		checkAuth();
		return () => {};
	}, []);

	if (isAuth) {
		return <BottomRoutes />;
	}
	return <AuthRoutes />;
}

export default Routes;
