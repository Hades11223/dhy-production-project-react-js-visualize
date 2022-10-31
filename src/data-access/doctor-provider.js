import client from "../utils/client-utils";
import constants from "../resources/strings";
import clientUtils from "../utils/client-utils";

export default {
  getById(url, id) {
    return clientUtils.requestApi(
      "get",
      url + "/isofh/services/qms/getdoctor?doctorUser=" + id
    );
  },
};
