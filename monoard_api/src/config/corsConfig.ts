export const corsConfig = {
  origin: [
    // TODO: Get this from env
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
}
