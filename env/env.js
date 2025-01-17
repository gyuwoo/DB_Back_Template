import path from 'path';
import dotenv from 'dotenv';


if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.join(__dirname, '.env.production') });
} else if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: path.join(__dirname, '.env.development') });
} else {
    dotenv.config({ path: path.join(__dirname, '.env.local') });
}