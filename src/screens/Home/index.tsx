import React from "react";
import { Text, TouchableOpacity as Button, View as Container, ActivityIndicator as Spinner } from "react-native";

import { FlashList } from "@shopify/flash-list";

import HomeHeader from "../../components/HomeHeader";
import HomePublish from "../../components/HomePublish";
import NewPostActionSheet from "../../components/PostActionSheet";
import Post from "../../components/Post";

import HomeViewModel from "./view.model";

function HomePage() {
	const { handleLoadFeed, handleLoadPosts, isLoading, posts } = HomeViewModel();
	return (
		<Container className="flex-1">
			<HomeHeader />
			<HomePublish />
			<NewPostActionSheet />
			{posts.length > 0 ? (
				<Container style={{ flexGrow: 1, flexDirection: "row" }}>
					<FlashList
						renderItem={({ item }) => {
							return <Post data={item} />;
						}}
						getItemType={(item) => {
							return item.uuid;
						}}
						data={posts}
						estimatedItemSize={20}
						ListFooterComponent={() => (
							<Container className="h-52 w-full p-3 items-center">
								<Button
									disabled={isLoading}
									activeOpacity={0.8}
									className="w-3/4 h-10  bg-[#21ace1] rounded-full"
									onPress={async () => {
										await handleLoadFeed();
									}}
								>
									<Container className="flex-1 justify-center items-center flex-row gap-3">
										{isLoading ? (
											<>
												<Spinner color={"#FFF"} size={"small"} />
												<Text className="text-slate-50 text-center">Carregando</Text>
											</>
										) : (
											<Text className="text-slate-50 text-center">Carregar mais</Text>
										)}
									</Container>
								</Button>
							</Container>
						)}
					/>
				</Container>
			) : (
				<Container className="flex-1 justify-center items-center">
					<Spinner color={"#21ace1"} size={"large"} />
				</Container>
			)}
		</Container>
	);
}

export default HomePage;
