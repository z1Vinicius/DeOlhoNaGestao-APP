import { schemaMigrations, createTable, addColumns } from "@nozbe/watermelondb/Schema/migrations";

const migrations = schemaMigrations({
	migrations: [
		{
			// ⚠️ Set this to a number one larger than the current schema version
			toVersion: 2,
			steps: [
				// See "Migrations API" for more details
				addColumns({
					table: "Post",
					columns: [{ name: "hasLike", type: "boolean", isOptional: true }],
				}),
			],
		},
	],
});

export default migrations;
