import { db } from '../utils/db.config';

const createNotesTable = () => {
  db.executeSql(
    'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note VARCHAR, subnote VARCHAR, date DATETIME DEFAULT CURRENT_TIMESTAMP)',
    [],
    result => {
      console.log('notes table created successfully');
    },
    error => {
      console.log('Create table error', error);
    },
  );
};

const createNote = async ({note, subnote}: {note: string; subnote: string}) => {
  let sql = 'INSERT INTO notes (note, subnote) VALUES (?, ?)';
  let params = [note, subnote];
  db.executeSql(
    sql,
    params,
    result => {
      console.log(result);
    },
    error => {
      console.log('Create user error', error);
    },
  );
};

const listNotes = async () => {
  const sql = 'SELECT * FROM notes order by date DESC';
  let data = <any>[];
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, results) => {
          let rows = results.rows.raw(); // shallow copy of rows Array
          rows.forEach(dt => data.push(dt));
          resolve(data);
        },
        error => {
          console.log('List user error', error);
        },
      );
    });
  });
};

const updateNotes = async ({
  id,
  note,
  subnote,
}: {
  id: number;
  note: string;
  subnote: string;
}) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE notes set note=?, subnote=? where id=?',
      [note, subnote, id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('sakses');
        }
      },
    );
  });
};

const deleteNote = async ({id}: {id: number}) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM  notes where id=?', [id], (tx, results) => {
      console.log('Results', results.rowsAffected);
    });
  });
};

export { createNote, createNotesTable, deleteNote, listNotes, updateNotes };
