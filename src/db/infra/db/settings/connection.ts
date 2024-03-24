import { Database } from "@nozbe/watermelondb";
import adapter from "./base";

const database = new Database({
	adapter,
	modelClasses: [],
});

export default database;
