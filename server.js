import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';


const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/client', express.static('client'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
