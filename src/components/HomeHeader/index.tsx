import { View as Container, SafeAreaView as SafeContainer, TouchableOpacity as Button, Text } from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, AvatarFallbackText } from "@gluestack-ui/themed";
import { Divider } from "@gluestack-ui/themed";
import database from "src/db/infra/db/settings/connection";
import { IAuthProfile } from "src/interfaces/auth";
import { nameToColor } from "src/utils/functions";

function HomeHeader() {
	const [firstName, setFirstName] = useState("Olho");
	const [lastName, setLastName] = useState("Gestão");
	useEffect(() => {
		const getName = async () => {
			const data = (await database.localStorage.get("auth.profile")) as string;
			if (data) {
				const parse = JSON.parse(data) as IAuthProfile["data"];
				setFirstName(parse.firstName as string);
				setLastName(parse.lastName as string);
			}
		};
		getName();
	}, []);

	return (
		<Container>
			<SafeContainer className="flex-row justify-between items-center p-2 mt-2  h-14">
				<Container>
					<Text className="text-xl font-semibold">DE OLHO</Text>
				</Container>
				<Container className="flex-row gap-2 items-center">
					<Button activeOpacity={0.7}>
						<MaterialCommunityIcons name={"bell"} color={"black"} size={22} />
					</Button>
					<Button activeOpacity={0.9}>
						<Avatar style={{ backgroundColor: nameToColor(firstName, lastName), borderRadius: 100 }} size="sm" borderRadius="$full">
							<AvatarFallbackText>{`${firstName} ${lastName}`}</AvatarFallbackText>
						</Avatar>
					</Button>
				</Container>
			</SafeContainer>
			<Divider orientation="horizontal" bg="$coolGray300" h={1} />
		</Container>
	);
}

export default HomeHeader;
