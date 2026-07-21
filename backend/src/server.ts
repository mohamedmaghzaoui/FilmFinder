import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { AppConfig } from './config/AppConfig';
const config = AppConfig.getInstance();

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
