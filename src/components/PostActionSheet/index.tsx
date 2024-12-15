import { FontAwesome } from "@expo/vector-icons";
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, FormControl, VStack } from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerSuccessResult } from "expo-image-picker";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, TouchableOpacity as Button, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { PostRepository } from "src/db/infra/db/repositories/post.repository";
import IPost from "src/interfaces/post";
import api from "src/services/api";
import useStore from "src/stores/feed";
import { v4 as uuidv4 } from "uuid";

export interface IPostActionChooseRef {
	handleOpen: () => void;
	handleClose: () => void;
	checkUpdates: () => Promise<boolean>;
}

function NewPostActionSheet(props, ref) {
	const [showActionsheet, setShowActionsheet] = useState(false);
	const [images, setImages] = useState<ImagePickerSuccessResult[]>([]);
	const [buttonDisable, setDisable] = useState<boolean>(true);
	const updateFeed = useStore((state) => state.emitEvent);

	useEffect(() => {
		(async () => {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				alert("Desculpe, precisamos das permissões de acesso à biblioteca de mídia para selecionar as imagens.");
			}
		})();
	}, []);

	const selectImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.5,
			allowsEditing: true,
			aspect: [4, 3],
		});

		if (!result.canceled) {
			const selectedImages = result.uri;
			if (!selectedImages) {
				return;
			}
			setImages((prevImages) => [...prevImages, selectedImages]);
		}
	};

	const removeImage = (index) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			postText: "",
			media: [],
		},
	});

	const onSubmit = async (data) => {
		const { postText, media } = data;

		try {
			const base64Images = await Promise.all(
				images.map(async (imageUri) => {
					const response = await fetch(imageUri as any);
					const blob = await response.blob();
					const base64 = await new Promise((resolve, reject) => {
						const reader = new FileReader();
						reader.onload = () => {
							const result = reader.result as string;
							return resolve(result.split(",")[1]);
						};
						reader.onerror = reject;
						reader.readAsDataURL(blob);
					});
					return base64;
				})
			);

			const postId = uuidv4();
			const response = await api.post("/api/posts/create", {
				id: postId,
				post_text: postText,
				media: base64Images,
			});

			if (response.status === 201) {
				await PostRepository.createOrUpdateBasedOnExistence(postId, response.data as IPost);
				updateFeed();
				setShowActionsheet(false);
				setImages([]);
				reset();
			} else {
				Alert.alert("Erro ao fazer postagem");
			}
		} catch (error) {
			// console.error("Ocorreu um erro:", error);
			// Alert.alert("Erro", "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.");
		}
	};

	const handleOpen = () => {
		setShowActionsheet(true);
	};
	const handleClose = () => setShowActionsheet(false);

	useImperativeHandle(ref, () => ({
		handleOpen: handleOpen,
		handleClose: handleClose,
	}));

	return (
		<Actionsheet isOpen={showActionsheet} onClose={handleClose}>
			<KeyboardAvoidingView
				// behavior="position"
				style={{
					position: "relative",
					flex: 1,
					justifyContent: "flex-end",
				}}
			>
				<ActionsheetBackdrop />
				<ActionsheetContent maxHeight="75%">
					<ActionsheetDragIndicatorWrapper>
						<ActionsheetDragIndicator />
					</ActionsheetDragIndicatorWrapper>
					<VStack w="$full" p={20}>
						<View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
							<Text className="text-lg font-bold">Nova Postagem</Text>
						</View>
						<FormControl mt={15}>
							<Controller
								control={control}
								name={"postText"}
								render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
									<>
										{error && (
											<Animated.View className="w-full" entering={FadeIn} exiting={FadeOut}>
												<Text className="text-red-500 text-start">{error.message}</Text>
											</Animated.View>
										)}
										<View className="h-52 rounded-sm border-solid border-gray-500/30 border flex-row  p-2">
											<TextInput
												multiline={true}
												placeholder="Comece a informar...."
												className="flex-1 text-zinc-900"
												value={value}
												onChangeText={(value) => {
													onChange(value);
													value && value.length < 10 ? setDisable(true) : setDisable(false);
												}}
												onBlur={onBlur}
											/>
										</View>
									</>
								)}
							/>
							<ScrollView horizontal={true} className="w-full flex-row gap-2 mt-1">
								{images.length < 4 ? (
									<Button onPress={selectImage} activeOpacity={0.8} className="w-32 h-32 bg-gray-200 rounded-md justify-center items-center">
										<FontAwesome name="plus-circle" size={20} color={"#1aace4"} />
									</Button>
								) : (
									""
								)}
								{images.map((image, index) => (
									<View className="relative m-2" key={Math.random().toString()}>
										<Image key={index} source={{ uri: image }} className="w-32 h-32 rounded-md" />
										<Button onPress={() => removeImage(index)} className="absolute top-1 right-1 bg-white rounded-full w-8 h-8 flex items-center justify-center">
											<FontAwesome name="close" size={10} />
										</Button>
									</View>
								))}
							</ScrollView>
							<Button
								disabled={buttonDisable}
								activeOpacity={0.9}
								onPress={handleSubmit(onSubmit)}
								className="mt-5 w-full h-10 bg-[#1aace4] rounded-2xl p-2 justify-center items-center"
							>
								<Text className="text-slate-50 text-center ">Postar</Text>
							</Button>
						</FormControl>
					</VStack>
				</ActionsheetContent>
			</KeyboardAvoidingView>
		</Actionsheet>
	);
}

export default forwardRef(NewPostActionSheet);
