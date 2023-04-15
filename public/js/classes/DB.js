let idb;

class DB {
    constructor() {

    }

    createDB = () => new Promise( ( resolve, reject ) => {
        const createDB = window.indexedDB.open('maze',1);
        createDB.onerror = () => reject('Houston, we have a problem.');
        createDB.onsuccess = () => {
            idb = createDB.result;
            resolve('IDB Ready');
        };
        createDB.onupgradeneeded = e => {
            const db = e.target.result;
            const objectStore = db.createObjectStore('maze', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('nickname','nickname', { unique: false });
            objectStore.createIndex('seconds','seconds', { unique: false });
            objectStore.createIndex('id','id', { unique: true });
        };
    });

    saveScore = score => new Promise( ( resolve, reject ) => {
        const objectStore = idb.transaction(['maze'], 'readwrite').objectStore('maze').add(score);
        objectStore.onerror = () => reject('Problems');
        objectStore.onsuccess = () => resolve('New item added');
    });

    getScores = () => new Promise( resolve => {
        const objectStore = idb.transaction('maze').objectStore('maze').index('seconds');
        let scoresItems = [];
    
        objectStore.openCursor().onsuccess = e => {
            const cursor = e.target.result;
    
            if(cursor) {
                scoresItems = [...scoresItems, cursor.value];
                cursor.continue();
                return;
            } else {
                resolve(scoresItems);
            } 
        };

        objectStore.onerror = () => reject('Problems');
    });
}

export default DB;