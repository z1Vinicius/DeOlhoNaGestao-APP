import HomeHeader from "../../components/HomeHeader";
import HomePublish from "../../components/HomePublish";
import Post from "../../components/Post";

import { View as Container } from "react-native";

function HomePage() {
	return (
		<Container>
			<HomeHeader />
			<HomePublish />
			<Post />
		</Container>
	);
}

export default HomePage;
