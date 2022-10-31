import client, { URL_HIS } from '../utils/client-utils';
import constants from '../resources/strings';
import clientUtils from '../utils/client-utils';
export default {
  search(payload) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          'get',
          `${URL_HIS}/isofh/services/imgdiag/getPatientByRoom/${payload?.tenPhong}${payload.maHoSo ? `/${payload.maHoSo}` : ''}${
            payload.soPhieu ? `/${payload.soPhieu}` : ''
          }`
        )
        .then((s) => {
          if (s.code === 0) {
            resolve(s.data);
          } else {
            reject(s.comment);
          }
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  callAndCancelCall(payload) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('post', URL_HIS + '/isofh/services/imgdiag/updateQMS', payload)
        .then((s) => {
          if (s.code === 0) {
            resolve(s.data);
          } else {
            reject(s.comment);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
