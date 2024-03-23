export function randomTwoPhrases(phrases: string[]) {
	const index1 = Math.floor(Math.random() * phrases.length);
	let index2 = Math.floor(Math.random() * (phrases.length - 1));
	if (index2 >= index1) {
		index2++;
	}
	return [phrases[index1], phrases[index2]];
}

export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
