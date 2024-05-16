import React from "react";
import { Text, TouchableOpacity as Button, View as Container, ActivityIndicator as Spinner, RefreshControl } from "react-native";
import { Avatar, AvatarFallbackText } from "@gluestack-ui/themed";
import { nameToColor } from "src/utils/functions";
import { Image } from "react-native";
import AppLogo from "../../../assets/logo/logo.png";
import ProfileViewModel from "./view.model";

const Logo = Image.resolveAssetSource(AppLogo).uri;

function ProfilePage() {
	const { firstName, lastName, handleLogout } = ProfileViewModel();

	return (
		<Container className="flex-1">
			<Container className="w-full h-full gap-3">
				<Container className="w-full h-80 bg-[#27acde] justify-center items-center relative rounded-b-3xl">
					<Container className="top-1 right-1 justify-center items-center absolute flex-row">
						<Image className="w-16 h-16" source={{ uri: Logo }} />
					</Container>
					<Container className="items-center gap-5">
						<Avatar style={{ backgroundColor: nameToColor(firstName, lastName), borderRadius: 100 }} size="2xl" borderRadius="$full">
							<AvatarFallbackText>{`${firstName} ${lastName}`}</AvatarFallbackText>
						</Avatar>
						<Container className="w-full items-center">
							<Text className="text-slate-50 font-bold text-4xl">{`${firstName} ${lastName}`}</Text>
							<Text className="text-slate-50 text-2xl font-medium">De Olho na Gestão</Text>
						</Container>
					</Container>
				</Container>
				<Container className="items-center gap-4">
					<Button activeOpacity={0.9} className="w-5/6 h-10 bg-[#848687] rounded-xl justify-center items-center">
						<Text className=" text-slate-50 font-medium">Alterar Senha</Text>
					</Button>
					<Button activeOpacity={0.9} className="w-5/6  h-10 bg-[#848687] rounded-xl justify-center items-center">
						<Text className=" text-slate-50 font-medium">Alterar Cidade</Text>
					</Button>
					<Button activeOpacity={0.9} className="w-5/6  h-10 bg-[#848687] rounded-xl justify-center items-center">
						<Text className=" text-slate-50 font-medium">Deletar Conta</Text>
					</Button>
				</Container>
				<Container className="flex-1 items-center  justify-end">
					<Button
						activeOpacity={0.9}
						className="w-5/6  h-12 bg-[#27acde] rounded-full justify-center items-center"
						onPress={async () => {
							await handleLogout();
						}}
					>
						<Text className=" text-slate-50 font-semibold text-base">Sair</Text>
					</Button>
				</Container>
			</Container>
		</Container>
	);
}

export default ProfilePage;
