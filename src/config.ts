export const config = {
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 3500,
  },
  repository: {
    url: 'https://github.com/GeoS74/wiki.git',
    path: process.env.REPO_PATH || '/repo',
    syncDelay: process.env.SYNC_MSTIME || 1000 * 60 * 60,
  },
};
