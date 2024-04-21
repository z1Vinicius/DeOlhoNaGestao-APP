import HomeHeader from "../../components/HomeHeader";
import HomePublish from "../../components/HomePublish";
import Post from "../../components/Post";

import { View as Container } from "react-native";

function HomePage() {
	return (
		<Container>
			<HomeHeader />
			<HomePublish />
			<Post
				data={{
					createdAt: "2024-05-21 15:22:33",
					updatedAt: "2024-05-21 00:00:00",
					id: "12121-121212-1212-1212",
					likes: 20,
					media: [],
					text: "Sono e tristeza",
				}}
				profile={{
					createdBy: "12121-1212-1212-121212-121212",
					lastName: "Silva",
					name: "Veneceos",
					profileImage: "12121212",
				}}
			/>
		</Container>
	);
}

export default HomePage;
