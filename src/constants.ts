const LOCAL_URL = 'http://localhost:3001/api';
const PROD_URL = 'TODO: add production url';

export const API_URL = process.env.ENVIRONMENT === 'production' ? PROD_URL : LOCAL_URL;
