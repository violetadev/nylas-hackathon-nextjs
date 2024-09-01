import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase.config";

export const addUserData = async (userId, data) => {
  try {
    await addDoc(collection(db, "users", userId, "data"), data);
  } catch (error) {
    throw error;
  }
};

export const registerParticipant = async (userId, data) => {
  const { given_name, surname, emails, notes, id, passcode } = data;
  try {
    const userDocRef = doc(db, "users", userId);
    const participantsCollectionRef = collection(userDocRef, "participants");
    const user = await addDoc(participantsCollectionRef, {
      givenName: given_name,
      surname: surname,
      email: emails[0].email,
      notes: notes,
      nylasContactId: id,
      passcode: passcode,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserByEmailAndPasscode = async (userId, email, passcode) => {
  try {
    const participantsCollectionRef = collection(
      db,
      "users",
      userId,
      "participants"
    );

    const q = query(participantsCollectionRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No participant found with the given email");
    }

    let userData = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.passcode === passcode) {
        userData = { id: doc.id, ...data };
      }
    });

    if (!userData) {
      throw new Error("Passcode does not match for the given email");
    }

    return userData;
  } catch (error) {
    throw error;
  }
};
