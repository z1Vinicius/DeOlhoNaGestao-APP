import { BottomTabScreenProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import BottomRoutesParams from "../interfaces/routes/bottom.routes";
import { Ionicons } from "@expo/vector-icons";

const visibleRoutes = ["Home", "NewPost", "Profile"];

const BottomRoutesStyles = ({ route }: BottomTabScreenProps<BottomRoutesParams>): BottomTabNavigationOptions => ({
	tabBarActiveBackgroundColor: "#1aace4",
	tabBarInactiveBackgroundColor: "#1aace4",
	tabBarActiveTintColor: "#FFF",
	tabBarInactiveTintColor: "#FFF",
	tabBarStyle: { height: 50 },
	tabBarShowLabel: false,
	tabBarIcon: ({ focused, size }: any) => {
		type icon = keyof typeof Ionicons.glyphMap;
		let iconName: icon = "home";
		let routeName = route.name;

		if (routeName == "Home") {
			iconName = focused ? "home" : "home-outline";
		} else if ((routeName = "NewPost")) iconName = focused ? "add-circle" : "add-circle-outline";
		else if ((routeName = "Profile")) iconName = focused ? "person" : "person-outline";

		return <Ionicons name={iconName} size={26} color={"#FFF"} />;
	},
});

export default BottomRoutesStyles;
