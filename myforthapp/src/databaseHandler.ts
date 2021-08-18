import {openDB} from 'idb'
import { Customer } from './models';

const DATABASE_NAME = "TCH1902DB";

initDB().then(()=>{
    console.log("database initialized!")
})

export async function insertCustomer(customer:Customer){
    const db = await openDB(DATABASE_NAME, 1)
    const tx = db.transaction('customers', 'readwrite');
    const store = tx.objectStore('customers');
    await store.put(customer)
}

async function initDB() {
    const db = await openDB(DATABASE_NAME, 1, {
      upgrade(db) {
        // Create a store of objects
        const store = db.createObjectStore('customers', {
          // The 'id' property of the object will be the key.
          keyPath: 'id',
          // If it isn't explicitly set, create a value by auto incrementing.
          autoIncrement: true,
        });
      },
    });
}  