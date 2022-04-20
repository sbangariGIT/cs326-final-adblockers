import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

const GROUPS_FILE = 'groups.json';
const USERS_FILE = 'users.json';

// Returns a function that will read a score file.
function readFile(path) {
  return async () => {
    try {
      const file = await readFile(path, 'utf8');
      const data = JSON.parse(scoreFile);
      return data;
    } catch (error) {
      // Likely the file doesn't exist
      return [];
    }
  };
}

// Create functions for reading from files.
const usersFunc = readFile(USERS_FILE);
const groupsFunc = readFile(GROUPS_FILE);

// Returns a function that will save a user to the user file.
function saveToUserFile(path) {
  return async (id, email, name, major, cred_level, profile_url) => {
    const data = { id, email, name, major, cred_level, profile_url };
    const users = await usersFunc();
    users.push(data);
    writeFile(path, JSON.stringify(users), 'utf8');
  };
}

// Returns a function that will save a group to the group file.
function saveToGroupFile(path) {
  return async (group_id, _class, name, members, type, max) => {
    const data = { group_id, _class, name, members, type, max };
    const groups = await groupsFunc();
    groups.push(data);
    writeFile(path, JSON.stringify(groups), 'utf8');
  };
}


const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/client', express.static('client'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
