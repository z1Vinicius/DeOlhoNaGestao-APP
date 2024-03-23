import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthStackRoutes } from "../interfaces/routes";
import InitialScreen from "../screens/Main/index";
import LoginView from "../screens/Login";

const { Navigator, Screen } = createStackNavigator<AuthStackRoutes>();

function AuthRoutes() {
	return (
		<Navigator>
			<Screen name="Main" options={{ headerShown: false }} component={InitialScreen} />
			<Screen name="Login" options={{ headerShown: false }} component={LoginView} />
		</Navigator>
	);
}
export default AuthRoutes;
