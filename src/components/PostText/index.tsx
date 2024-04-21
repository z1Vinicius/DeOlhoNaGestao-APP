import { View as Container, Text } from "react-native";

interface IPostText {
	description: string;
}

function PostText({ description }: IPostText) {
	return (
		<Container>
			<Text className="text-zinc-900">{description}</Text>
		</Container>
	);
}

export default PostText;
