import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardOpen = () => {
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow);
		const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	const handleKeyboardDidShow = () => {
		setIsKeyboardOpen(true);
	};

	const handleKeyboardDidHide = () => {
		setIsKeyboardOpen(false);
	};

	return isKeyboardOpen;
};

export default useKeyboardOpen;
