import clientUtils from '../utils/client-utils';

export default {
  getInvoiceDoorRoomById(url, id, isInvoiceDoor) {
    const endPoint = `${url}/isofh/services/invoiceDoor/getRoom?Value=${id}&IsInvoiceDoor=${isInvoiceDoor}`;
    return clientUtils.requestApi('get', endPoint);
  },
  getListInvoiceDoorRoom(url) {
    return clientUtils.requestApi('get', `${url}/isofh/services/invoiceDoor/getDepartment`, {});
  },
  getAllData() {
    return clientUtils.requestApi2('get', `/api/room`);
  },
  save(obj) {
    return clientUtils.requestApi2('put', `/api/room/save`, obj);
  },

  getInfoPatientInRoom(idRoom) {
    return clientUtils.requestApi("get", `/api/get/db/${idRoom}`)
  }
};
