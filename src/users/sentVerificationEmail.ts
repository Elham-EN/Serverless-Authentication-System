/* eslint-disable indent */
// This serverless function will be triggered whenever a new
// document is created in the temporary users collection
import * as dotenv from "dotenv";
dotenv.config();
import * as functions from "firebase-functions";
import { sendEmail } from "./sendEmail";

export const sendVerificationEmail = functions.firestore
  .document("/temporaryUsers/{id}")
  // snapshot - contain the data of the new temporary user
  .onCreate((snapshot, context) => {
    const tempUserInfo = snapshot.data();
    const { emailAddress, confirmationHash } = tempUserInfo;
    return sendEmail({
      to: emailAddress,
      from: process.env.EMAIL as string,
      subject: "My Reservation App Email Verification",
      message: `Click this link to verify your email: http://localhost:5000/restaurant-reservation-backend/us-central1/confirmEmail?conf=${confirmationHash}`,
    });
  });
