import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../../screens/Signup";
import SignIn from "../../screens/SignIn";
import Home from "../../screens/Home";
import { AuthContext } from "../../context/auth";
import HeaderTabs from "../../components/nav/HeaderTabs";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
	const [state, setState] = useContext(AuthContext);

	const authenticated = state && state.token !== "" && state.user !== null;

	return (
		<Stack.Navigator
			initialRouteName="Home"
			// screenOptions={{ headerShown: false }}
		>
			{authenticated ? (
				<Stack.Screen
					name="Home"
					component={Home}
					options={{
						title: "Links Daily",
						headerRight: () => <HeaderTabs />,
					}}
				/>
			) : (
				<>
					<Stack.Screen
						name="SignIn"
						component={SignIn}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Signup"
						component={Signup}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}
