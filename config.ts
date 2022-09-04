export const config = {
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 3500,
  },
  repository: {
    url: 'https://github.com/GeoS74/wiki.git',
    path: './repo',
    syncDelay: 1000 * 60 * 5,
  },
};
