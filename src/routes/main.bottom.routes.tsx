import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeView from "../screens/Main/index";

import BottomRoutesParams from "../interfaces/routes/bottom.routes";
import BottomRoutesStyles from "../styles/bottom.routes";
const { Navigator, Screen } = createBottomTabNavigator<BottomRoutesParams>();
import HomePage from "../screens/Home";
import ProfilePage from "../screens/Profile";

function BottomRoutes() {
	return (
		<Navigator screenOptions={BottomRoutesStyles}>
			<Screen name="Home" options={{ headerShown: false }} component={HomePage} />
			<Screen name="NewPost" options={{ headerShown: false }} component={HomePage} />
			<Screen name="Profile" options={{ headerShown: false }} component={ProfilePage} />
		</Navigator>
	);
}
export default BottomRoutes;
