import { combineReducers } from "redux";
import room from "./room";
import invoice from "./invoice";
import audio from "./audios";

export default combineReducers({
  room,
  invoice,
  audio,
});
