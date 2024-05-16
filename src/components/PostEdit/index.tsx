import { TouchableOpacity as Button, View as Container } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { Menu, MenuItem, MenuItemLabel } from "@gluestack-ui/themed";
import { useState, useEffect } from "react";
import useStore from "src/stores/feed";
import api from "src/services/api";
import { sleep } from "src/utils/functions";
import { PostRepository } from "src/db/infra/db/repositories/post.repository";
import { ToastAndroid } from "react-native";

interface IPostEdit {
	createdBy: string;
	postId: string;
	userId: string;
}

function PostEdit({ createdBy, postId, userId }: IPostEdit) {
	const [isLoading, setLoading] = useState(false);
	const updateFeed = useStore((state) => state.emitEvent);

	useEffect(() => {
		console.log("criado", createdBy, "user", userId);

		return () => {};
	}, []);

	const handleDelete = async () => {
		//
		try {
			const id = postId.replaceAll("-", "");
			setLoading(true);
			const request = await api.put(`api/posts/${id}/delete/`);
			if (request.status === 200) {
				await PostRepository.deletePost(postId);
				ToastAndroid.show("Postagem removida com sucesso!", ToastAndroid.LONG);
				await updateFeed();
			}
		} catch (error) {
			console.error("Erro ao lidar com a solicitação");
		} finally {
			await sleep(1500);
			setLoading(false);
		}
	};

	return (
		<Container>
			<Menu
				placement="top left"
				trigger={({ ...triggerProps }) => {
					return (
						<Button disabled={isLoading} {...triggerProps}>
							<Feather name={"more-vertical"} size={20} color={"#262626"} />
						</Button>
					);
				}}
			>
				{createdBy === userId ? (
					<MenuItem
						key="delete"
						textValue="Delete"
						onPress={async () => {
							await handleDelete();
						}}
					>
						<FontAwesome name={"trash"} size={20} color={"#21ace1"} style={{ marginRight: 5 }} />
						<MenuItemLabel size="sm">Deletar</MenuItemLabel>
					</MenuItem>
				) : (
					<MenuItem key="alert" textValue="Alert">
						<FontAwesome name={"bell"} size={20} color={"#21ace1"} style={{ marginRight: 5 }} />
						<MenuItemLabel size="sm">Denunciar</MenuItemLabel>
					</MenuItem>
				)}
			</Menu>
		</Container>
	);
}

export default PostEdit;
