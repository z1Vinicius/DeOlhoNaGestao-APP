import { View as Container, Text, TouchableOpacity as Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle, withRepeat, withSequence } from "react-native-reanimated";
import { useState, useEffect } from "react";
import useStore from "src/stores/feed";
import { sleep } from "src/utils/functions";
import api from "src/services/api";
import { PostRepository } from "src/db/infra/db/repositories/post.repository";
import IPost from "src/interfaces/post";

interface IPostInteraction {
	likes: number;
	hasLike: boolean;
	postId: string;
}

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(1.5);

function PostInteraction({ likes, hasLike, postId }: IPostInteraction) {
	const [isLoading, setLoading] = useState(false);
	const rotation = useSharedValue(0);
	const updateFeed = useStore((state) => state.emitEvent);
	const [hasPostLike, setHasLike] = useState(hasLike);
	const [likeCount, setLikeCount] = useState(likes);

	useEffect(() => {
		setHasLike(hasLike);
		setLikeCount(likes);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotateZ: `${rotation.value}deg` }],
	}));

	const handlePress = () => {
		rotation.value = withSequence(
			withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
			withRepeat(
				withTiming(ANGLE, {
					duration: TIME,
					easing: EASING,
				}),
				7,
				true
			),
			withTiming(0, { duration: TIME / 2, easing: EASING })
		);
	};

	const handleLike = async () => {
		try {
			const id = postId.replaceAll("-", "");
			setLoading(true);
			handlePress();
			const endpoint = hasLike ? `api/posts/${id}/unlike/` : `/api/posts/${id}/like/`;
			const request = await api[hasLike ? "delete" : "post"](endpoint);
			if (request.status === 200) {
				const responseData = request.data as IPost;
				setHasLike(responseData.data.hasLike);
				setLikeCount(responseData.data.likes);
				await PostRepository.createOrUpdateBasedOnExistence(postId, responseData);
				await updateFeed();
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
				await PostRepository.createOrUpdateBasedOnExistence(postId, error.response.data as IPost);
				await updateFeed();
			} else {
				console.error("Erro ao lidar com a solicitação");
			}
		} finally {
			await sleep(1500);
			setLoading(false);
		}
	};

	return (
		<Container className="mt-3 flex-row justify-between">
			<Container className="flex-row gap-2 items-center">
				<Button disabled={isLoading} onPress={handleLike}>
					<Animated.View style={animatedStyle}>
						<AntDesign name={"heart"} color={hasPostLike ? "#21ace1" : "#000"} size={20} />
					</Animated.View>
				</Button>
				<Button disabled={isLoading} onPress={handleLike}>
					<Text className={hasPostLike ? "text-[#21ace1] font-bold" : "#000"}>{hasPostLike ? "Descurtir" : "Curtir"}</Text>
				</Button>
			</Container>

			<Container className="text-sm flex-row gap-2 items-center">
				{likeCount > 0 ? (
					<>
						<AntDesign name={"eye"} color={"#21ace1"} size={20} />
						<Text>
							<Text>{likeCount}</Text> pessoas de olho
						</Text>
					</>
				) : (
					""
				)}
			</Container>
		</Container>
	);
}

export default PostInteraction;
