import HomeHeader from "../../components/HomeHeader";
import HomePublish from "../../components/HomePublish";
import { View as Container } from "react-native";

function HomePage() {
	return (
		<Container>
			<HomeHeader />
			<HomePublish />
		</Container>
	);
}

export default HomePage;
