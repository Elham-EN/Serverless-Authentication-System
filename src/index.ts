/* eslint-disable @typescript-eslint/object-curly-spacing */
import { functions } from "firebase";
import { functions as userFunctions } from "./users";

export default {
  ...userFunctions,
};
