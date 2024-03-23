import { useState, useEffect } from "react";
import { randomTwoPhrases } from "../../utils/functions";
import stringPhrases from "../../data/messages";

function MainAuthViewModel() {
	const [phrases, setPhrases] = useState<string[]>([]);

	useEffect(() => {
		const interval = setInterval(() => {
			const randomPhrases = randomTwoPhrases(stringPhrases);
			setPhrases(randomPhrases);
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return {
		phrases,
	};
}

export default MainAuthViewModel;
