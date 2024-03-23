import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeView from "../screens/Home/index";

const { Navigator, Screen } = createBottomTabNavigator();

function BottomRoutes() {
	return (
		<Navigator>
			<Screen name="Home" options={{ headerShown: false }} component={HomeView} />
		</Navigator>
	);
}
export default BottomRoutes;
