const LOCAL_URL = 'http://localhost:3001/api';
const PROD_URL = 'https://hatch-assignment.herokuapp.com/api';

export const API_URL = process.env.NODE_ENV === 'production' ? PROD_URL : LOCAL_URL;
