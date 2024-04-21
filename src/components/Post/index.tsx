import { View as Container, SafeAreaView as SafeContainer, TouchableOpacity as Button, Text } from "react-native";
import { Avatar, AvatarFallbackText } from "@gluestack-ui/themed";
import { Feather, AntDesign } from "@expo/vector-icons";

function Post() {
	return (
		<Container className="p-3 m-2 rounded-2xl bg-gray-300">
			<Container className="flex-row gap-2 justify-between">
				<Container className="flex-row gap-2">
					<Avatar bgColor="$blue500" size="md" borderRadius="$full">
						<AvatarFallbackText>Vinícius Araújo</AvatarFallbackText>
					</Avatar>
					<Container className="flex-col">
						<Text className="text-lg text-gray-800 font-medium">Vinícius Araújo</Text>
						<Text className="text-gray-800">Há 5 minutos atrás</Text>
					</Container>
				</Container>
				<Button>
					<Feather name={"more-vertical"} size={20} color={"#262626"} />
				</Button>
			</Container>

			<Container className="mt-2">
				<Container>
					<Text className="text-zinc-900">Centro da comunidade Fortaleza de Pedra em Recife há 2 semanas sem iluminação pública. Um descaso total.</Text>
				</Container>

				<Container className="gap-2 flex-row mt-2">
					<Button className="bg-cyan-500 w-20 h-20 rounded-lg"></Button>
					<Button className="bg-cyan-600 w-20 h-20 rounded-lg"></Button>
					<Button className="bg-cyan-700 w-20 h-20 rounded-lg"></Button>
				</Container>

				<Container className="mt-3 flex-row  justify-between">
					<Container className="flex-row gap-2">
						<AntDesign name={"heart"} color={"#21ace1"} size={20} />
						<Text>Curtir</Text>
					</Container>

					<Container className="text-sm">
						<Text>5 pessoas cientes</Text>
					</Container>
				</Container>
			</Container>
		</Container>
	);
}

export default Post;
