import { openDB } from 'idb'

const DATABASE_NAME = 'TCH1902_Pic'

initDB().then(() => {
    console.log("database initialized!")
})

export async function getAllPets() {
    const db = await openDB(DATABASE_NAME, 1);
    return await db.getAll("MyPets")
  }

export async function insertPet(pet: any) {
    const db = await openDB(DATABASE_NAME, 1)
    await db.put("MyPets",pet)
}

async function initDB() {
    const db = await openDB(DATABASE_NAME, 1, {
        upgrade(db) {
            // Create a store of objects
            const store = db.createObjectStore('MyPets', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            });
        },
    });
}