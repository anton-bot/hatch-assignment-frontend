const LOCAL_URL = 'http://localhost:3001/api';
const PROD_URL = 'https://hatch-assignment-backend.azurewebsites.net/api';

export const API_URL = process.env.ENVIRONMENT === 'production' ? PROD_URL : LOCAL_URL;
