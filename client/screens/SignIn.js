import React, { useState } from "react";
import { View } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ navigation }) => {
	const [email, setEmail] = useState("abdulsagheeras29@gmail.com");
	const [password, setPassword] = useState("Sagheer29");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		if (!name || !email || !password) {
			alert("All fields are required");
			setLoading(false);
			return;
		}
		console.log("SIGNINREQUEST => ", name, email, password);
		try {
			const { data } = await axios.post(`${API}/signin`, {
				name,
				email,
				password,
			});
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				await AsyncStorage.setItem("@auth", JSON.stringify(data));
				setLoading(false);
				console.log("SIGN IN SUCCESS => ", data);
				alert("Sign up successful");
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const loadFromAsyncStorage = async () => {
		let data = await AsyncStorage.getItem("@auth");
		console.log("From Async Storage: ", data);
	};
	loadFromAsyncStorage();

	return (
		<KeyboardAwareScrollView
			contentCotainerStyle={{
				flex: 1,
				justifyContent: "center",
			}}>
			<View style={{ marginVertical: 100 }}>
				<CircleLogo />
				<Text title center>
					Sign In
				</Text>

				<UserInput
					name="EMAIL"
					value={email}
					setValue={setEmail}
					autoCompleteType="email"
					keyboardType="email-address"
				/>
				<UserInput
					name="PASSWORD"
					value={password}
					setValue={setPassword}
					secureTextEntry={true}
					autoComplteType="password"
				/>

				<SubmitButton
					title="Sign Up"
					handleSubmit={handleSubmit}
					loading={loading}
				/>

				<Text small center>
					Not yet registered?{" "}
					<Text onPress={() => navigation.navigate("Signup")} color="#ff2222">
						Sign Up
					</Text>
				</Text>

				<Text small center color="orange" style={{ marginTop: 10 }}>
					Forgot Password?
				</Text>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default SignIn;
