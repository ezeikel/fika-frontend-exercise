import "dotenv/config";

export default ({ config }: { config: any }) => ({
  ...config,
  extra: {
    moviesDbAPIKey: process.env.MOVIES_DB_API_KEY,
  },
});
