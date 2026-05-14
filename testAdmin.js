import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { readFileSync } from 'fs';

const firebaseConfig = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function run() {
  const q = collection(db, 'applications');
  const snap = await getDocs(q);
  console.log("Documents in applications collection:", snap.size);
  snap.forEach(doc => {
    console.log(doc.id, doc.data().client?.name);
  });
  process.exit(0);
}
run().catch(console.error);
