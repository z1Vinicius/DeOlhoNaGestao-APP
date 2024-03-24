import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Toast from "react-native-toast-message";
import CustomToastConfig from "./src/styles/toast";

import "react-native-gesture-handler";
import "react-native-get-random-values";
import Routes from "./src/routes";

import { NativeWindStyleSheet } from "nativewind";

function App() {
	return (
		<GluestackUIProvider config={config}>
			<NavigationContainer>
				<StatusBar hidden={true}></StatusBar>
				<Routes />
			</NavigationContainer>
			<Toast config={CustomToastConfig as any} />
		</GluestackUIProvider>
	);
}

export default App;
