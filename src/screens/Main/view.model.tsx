import { useState, useEffect } from "react";
import { randomTwoPhrases } from "../../utils/functions";
import stringPhrases from "../../data/messages";

function MainAuthViewModel() {
	const [phrases, setPhrases] = useState<string[]>(randomTwoPhrases(stringPhrases));
	const [isChange, setIsChange] = useState<boolean>(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsChange(true);
			const randomPhrases = randomTwoPhrases(stringPhrases);
			setPhrases(randomPhrases);

			setTimeout(() => {
				setIsChange(false);
			}, 600);
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return {
		phrases,
		isChange,
	};
}

export default MainAuthViewModel;
