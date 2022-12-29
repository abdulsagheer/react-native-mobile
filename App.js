import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Signup from "./screens/Signup";
import SignIn from "./screens/SignIn";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Signup" component={Signup} />
				<Stack.Screen name="SignIn" component={SignIn} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
