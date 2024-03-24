import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schemas from "../schemas/schemas";
import migrations from "../migrations/migrations";

const adapter = new SQLiteAdapter({
	schema: schemas,
	migrations,
	onSetUpError: (error) => {
		console.log("🛜 Problema ao se conectar com o banco de dados!");
	},
});

export default adapter;
