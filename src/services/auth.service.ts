import {db} from '../utils/db.config';

const createAuthTable = async () => {
  db.executeSql(
    'CREATE TABLE IF NOT EXISTS auth (id INTEGER PRIMARY KEY AUTOINCREMENT, password VARCHAR, type VARCHAR)',
    [],
    result => {
      console.log('Auth Table Ready');
    },
    error => {
      console.log('Create auth table error', error);
    },
  );
};

const createAuth = async ({
  password,
  type,
}: {
  password: string;
  type: string;
}) => {
  let sql = 'INSERT INTO auth (password, type) VALUES (?, ?)';
  let params = [password, type];
  db.executeSql(
    sql,
    params,
    result => {
      console.log(result);
    },
    error => {
      console.log('create auth error', error);
    },
  );
};

const checkAuthExist = async ({type}: {type: string}) => {
  return new Promise((resolve: (value: number) => void, reject) => {
    db.executeSql(
      'SELECT * FROM auth WHERE type = ?',
      [type],
      (results: any) => {
        resolve(results.rows.length);
      },
      error => {
        reject(error);
      },
    );
  });
};

const checkPasswordExist = async ({
  password,
  type,
}: {
  password: string;
  type: string;
}) => {
  return new Promise((resolve: (value: number) => void, reject) => {
    db.executeSql(
      'SELECT * FROM auth WHERE password = ? AND type = ?',
      [password, type],
      (results: any) => {
        resolve(results.rows.length);
      },
      error => {
        reject(error);
      },
    );
  });
};

export {createAuth, createAuthTable, checkAuthExist, checkPasswordExist};
