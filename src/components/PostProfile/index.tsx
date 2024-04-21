import { View as Container, TouchableOpacity as Button, Text } from "react-native";
import { Avatar, AvatarFallbackText } from "@gluestack-ui/themed";

function PostProfile() {
	return (
		<Container className="flex-row gap-2 p-2">
			<Button activeOpacity={0.9}>
				<Avatar bgColor="$blue500" size="md" borderRadius="$full">
					<AvatarFallbackText>Vinícius Araújo</AvatarFallbackText>
				</Avatar>
			</Button>
			<Container className="flex-col">
				<Text className="text-lg text-gray-800 font-medium">Vinícius Araújo</Text>
				<Text className="text-gray-800">Há 5 minutos atrás</Text>
			</Container>
		</Container>
	);
}

export default PostProfile;
