import { View as Container, SafeAreaView as SafeContainer, TouchableOpacity as Button, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, AvatarFallbackText } from "@gluestack-ui/themed";
import { Divider } from "@gluestack-ui/themed";

function HomeHeader() {
	return (
		<Container>
			<SafeContainer className="flex-row justify-between items-center p-2 mt-2  h-14">
				<Container>
					<Text className="text-xl font-semibold">DE OLHO</Text>
				</Container>
				<Container className="flex-row gap-2 items-center">
					<Button activeOpacity={0.9}>
						<MaterialCommunityIcons name={"bell"} color={"black"} size={22} />
					</Button>
					<Button activeOpacity={0.9}>
						<Avatar bgColor="$blue500" size="sm" borderRadius="$full">
							<AvatarFallbackText>Vinícius Araújo</AvatarFallbackText>
						</Avatar>
					</Button>
				</Container>
			</SafeContainer>
			<Divider orientation="horizontal" bg="$coolGray300" h={1} />
		</Container>
	);
}

export default HomeHeader;
