/* eslint-disable indent */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const confirmEamil = functions.https.onRequest(async (req, res) => {
  const confirmationHash = req.query.conf;
  const auth = admin.auth();
  const firestoreDB = admin.firestore();

  const querySnapshot = await firestoreDB
    .collection("temporaryUsers")
    .where("confirmationHash", "==", confirmationHash)
    .get();

  if (querySnapshot.size === 0) {
    return res.redirect("http://localhost:3000/email-confirmation/failure");
  }

  const temporaryUserDoc = querySnapshot.docs[0];

  const { authUid, emailAddress, firstName, lastName, bio } =
    temporaryUserDoc.data();

  await auth.updateUser(authUid, { emailVerified: true });
  await firestoreDB
    .collection("users")
    .doc(authUid)
    .set({ emailAddress, firstName, lastName, bio });

  await firestoreDB
    .collection("temporaryUsers")
    .doc(temporaryUserDoc.id)
    .delete();
  return res.redirect(
    "http://localhost:3000/create-account/email-confirmation/success"
  );
});
