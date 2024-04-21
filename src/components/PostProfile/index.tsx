import { View as Container, TouchableOpacity as Button, Text } from "react-native";
import { Avatar, AvatarFallbackText } from "@gluestack-ui/themed";
import { useMemo } from "react";

interface IPostProfile {
	name: string;
	lastName: string;
	profileImage: string;
	createdAt: string;
}
const dayjs = require("dayjs");

function PostProfile({ name, lastName, profileImage, createdAt }: IPostProfile) {
	const fullName = `${name} ${lastName}`;
	const postDate = useMemo(() => dayjs(createdAt).format("DD/MM/YYYY HH:mm"), [createdAt]);

	return (
		<Container className="flex-row gap-2 p-2">
			<Button activeOpacity={0.9}>
				<Avatar bgColor="$blue500" size="md" borderRadius="$full">
					<AvatarFallbackText>{fullName}</AvatarFallbackText>
				</Avatar>
			</Button>
			<Container className="flex-col">
				<Text className="text-lg text-gray-800 font-medium">{fullName}</Text>
				<Text className="text-gray-800">{postDate}</Text>
			</Container>
		</Container>
	);
}

export default PostProfile;
