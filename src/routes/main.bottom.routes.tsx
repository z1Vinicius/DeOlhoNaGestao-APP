import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeView from "../screens/Main/index";

const { Navigator, Screen } = createBottomTabNavigator();
import HomePage from "../screens/Home";

function BottomRoutes() {
	return (
		<Navigator>
			<Screen name="Home" options={{ headerShown: false }} component={HomePage} />
		</Navigator>
	);
}
export default BottomRoutes;
