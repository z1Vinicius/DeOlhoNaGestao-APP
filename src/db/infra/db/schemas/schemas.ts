import { appSchema } from "@nozbe/watermelondb";
import { tableSchema } from "@nozbe/watermelondb";

const schemas = appSchema({
	version: 1,
	tables: [
		tableSchema({
			name: "profile",
			columns: [
				{ name: "uuid", type: "string" },
				{ name: "name", type: "string" },
				{ name: "last_name", type: "string" },
				{ name: "username", type: "string" },
				{ name: "email", type: "string" },
				{ name: "profile_image", type: "string" },
			],
		}),
	],
});

export default schemas;
