/* eslint-disable import/default */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { v4 as uuid } from "uuid";

interface ReqBodyAuth {
  email: string;
  password: string;
}

interface ReqBodyCreate {
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
}

// Define a function where the frontend will call, when new user signup
export const createAccount = functions.https.onRequest(async (req, res) => {
  // Get new user data from the incoming client app request
  const newUserInfo = req.body as ReqBodyAuth;
  // First create the new user in Firebase auth
  const authUid = await createAuthUser(newUserInfo);
  // Second create a temporary user document inside the temporary
  // users collection inside the firestore
  const newUserInfo2 = req.body as ReqBodyCreate;
  await createTemporaryUser(authUid, newUserInfo2);
  res.status(200).send("Success");
});

async function createAuthUser(newUserInfo: ReqBodyAuth): Promise<string> {
  // Access to Firebase Auth Instance
  const auth = admin.auth();
  const { email, password } = newUserInfo;
  const newUser = await auth.createUser({ email, password });
  return newUser.uid;
}

async function createTemporaryUser(uid: string, newUserInfo: ReqBodyCreate) {
  const firestoreDB = admin.firestore();
  const { email, firstName, lastName, bio } = newUserInfo;
  const confirmationHash = uuid();
  const createdAt = Date.now();
  const tempUserDoc = {
    authUid: uid,
    emailAddress: email,
    firstName,
    lastName,
    bio,
    confirmationHash,
    createdAt,
  };
  return firestoreDB.collection("temporaryUsers").doc().set(tempUserDoc);
}
