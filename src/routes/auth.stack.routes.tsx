import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "../screens/InitialScreen/index";

const { Navigator, Screen } = createStackNavigator();

function AuthRoutes() {
	return (
		<Navigator>
			<Screen name="Main" options={{ headerShown: false }} component={InitialScreen} />
		</Navigator>
	);
}
export default AuthRoutes;
