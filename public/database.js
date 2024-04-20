import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

open({
    filename: '../db/database.db',
    driver: sqlite3.Database
  }).then((db) => {
    // do your thing
    db.exec("CREATE TABLE if not exists lorem(info TEXT)");
    db.exec("INSERT INTO lorem (info) VALUES ('information here')");
})


db.serialize(()=>{
    db.run("CREATE TABLE if not exists lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
})

async function dropTable(){
    db.run("DROP TABLE lorem");
}

async function fetchDB(from = 0, to = 10){
    db.all("SELECT * FROM lorem limit 5", function(err, data) {
        console.log(data)
        return data
    });
}

module.exports = { fetchDB, dropTable };