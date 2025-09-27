/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_GSHEET_ENDPOINT: string;
	readonly VITE_GSHEET_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
