// import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
// import { db } from "./firebase";

// In a real app, you would use Firestore.
// For this demo with missing Firebase config, we'll mock the database.
const mockDB = [];

export const saveRegistration = async (data) => {
  try {
    // REAL IMPLEMENTATION:
    // const docRef = await addDoc(collection(db, "registrations"), {
    //   ...data,
    //   createdAt: new Date().toISOString()
    // });
    // return docRef.id;

    // MOCK IMPLEMENTATION:
    const newDoc = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
    mockDB.push(newDoc);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return newDoc.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getRegistrations = async () => {
  try {
    // REAL IMPLEMENTATION:
    // const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
    // const querySnapshot = await getDocs(q);
    // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // MOCK IMPLEMENTATION:
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockDB].reverse();
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};
