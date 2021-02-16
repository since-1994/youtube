import '@babel/polyfill';
import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import './db';
import './models/Video';
import './models/Comment';
import './models/User';

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`🔫listening: http://localhost:${PORT}`);
});