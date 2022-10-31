import clientUtils from '../utils/client-utils';
const url = process.env.REACT_APP_HIS_URL;
export default {
  getAllAreas() {
    return clientUtils.requestApi('get', `${url}/isofh/services/invoiceDoor/getAllAreas`, {});
  },

  checkin(hisUrl, body){
    if(!hisUrl){
      hisUrl = url;
    }
    return clientUtils.requestApi('post', `${hisUrl}/isofh/services/invoiceDoor/checkin`, body);
  },
  getForm(hisUrl, id) {
    if(!hisUrl){
      hisUrl = url;
    }
    return new Promise((resolve, reject) => {
        clientUtils.downloadFile('get', `${hisUrl}/isofh/services/invoiceDoor/getForm/${id}`, {}, {}).then(x => {
            resolve(x);
        }).catch(e => {
            reject(e);
        })
    });
},
};
