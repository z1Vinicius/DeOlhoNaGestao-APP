export function randomTwoPhrases(phrases: string[]) {
	const index1 = Math.floor(Math.random() * phrases.length);
	let index2 = Math.floor(Math.random() * (phrases.length - 1));
	if (index2 >= index1) {
		index2++;
	}
	return [phrases[index1], phrases[index2]];
}

export function nameToColor(nome: string, sobrenome: string): string {
	const nomeCompleto = nome + sobrenome;
	// Função de hash simples
	function simpleHash(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash += str.charCodeAt(i);
		}
		return hash;
	}

	// Calculando o hash do nome completo
	const hashValue = simpleHash(nomeCompleto);

	// Convertendo o hash em uma cor hexadecimal e ajustando a saturação e luminosidade
	const color = `hsl(${hashValue % 360}, 70%, 80%)`;

	return color;
}

export const sleep = (milliseconds: number) => new Promise((res) => setTimeout(res, milliseconds));
