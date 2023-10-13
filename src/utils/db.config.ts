import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase( {name: 'mydb', location: 'default'}, () => { console.log('Database connected!'); }, //on success
  error => console.log('Database error', error), //on error
);

export { db };
