import s from 'shelljs';
import dotenv from 'dotenv';
dotenv.config();

const config = require('./tsconfig.json');
const outDir = config.compilerOptions.outDir;
const env = (process.env.NODE_ENV || 'DEV').toLowerCase();
const scope = (process.env.SCOPE || 'DC').toUpperCase();

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp(`environments/.env.${env}`, `${outDir}/.env`);
s.mkdir('-p', `${outDir}/docs`);
s.cp('-R', 'server/docs/*', `${outDir}/docs`);
