import { openDB } from 'idb'

const DATABASE_NAME = 'TCH1902_Pic'

initDB().then(() => {
    console.log("database initialized!")
})

export async function getAllPets() {
    const db = await openDB(DATABASE_NAME, 1);
    var cursor = await db.transaction("MyPets").
              objectStore("MyPets").openCursor();
    var pets = [];
    //iterate all element in Pets store
    while (cursor) {
      //push the current row in to the result(pets)
      pets.push(cursor.value);
      //go go the next row
      cursor = await cursor.continue();
    }
    return pets;
  }


export async function insertPet(pet: any) {
    const db = await openDB(DATABASE_NAME, 1)
    const tx = db.transaction('MyPets', 'readwrite');
    const store = tx.objectStore('MyPets');
    await store.put(pet)
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