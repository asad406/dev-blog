import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret: process.env.JWT_SECRET,
};
