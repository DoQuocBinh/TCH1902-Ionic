import {openDB} from 'idb'
const DB_NAME= "GCH0902Review"

initDB().then(()=>{
    console.log("Database inititilized!")
})

export async function insertPerson(person:any) {
    const db = await openDB(DB_NAME,1)
    await db.put("person",person)
    console.log("1 row inserted!",person)
}

export async function getAllPerson() {
    const db = await openDB(DB_NAME,1)
    return await db.getAll("person")
}

async function initDB(){
    const db = await openDB(DB_NAME,1,{
        upgrade(db){
            const store = db.createObjectStore('person', {
                keyPath: 'id',
                autoIncrement: true,
              });
        
        }
    })
}