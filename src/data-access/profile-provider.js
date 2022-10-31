import client from "../utils/client-utils";
import constants from "../resources/strings";
import clientUtils from "../utils/client-utils";

export default {
  getWorkWait(terminal) {
    return clientUtils.requestApi(
      "get",
      "/api/get/workwait?room=" + terminal+"&v="+(new Date()).getTime(),
      {}
    );
  },
  getAudio(group, repeat = 2, speaker = 1) {
    return clientUtils.requestApi(
      "get",
      `/api/get/audio/${group}?repeat=${repeat}&speaker=${speaker}&v=${(new Date()).getTime()}`,
      {}
    );
  },
  getAudioByRoom(room, repeat = 2) {
    return clientUtils.requestApi(
      "get",
      `/api/get/audio/room/${room}?repeat=${repeat}&v=${(new Date()).getTime()}`,
      {}
    );
  },
  getFileAudio(file) {
    return clientUtils.requestApi("get", `/api/audio/${file}`, {});
  },
  getListRoom() {
    return clientUtils.requestApi("get", `/api/room`, {});
  },
};
