import axios from 'axios';
const server_url = (() => {
  const dataHost = [];
  for (let i = 0; i < 20; i++) {
    if (process.env['REACT_APP_HOST_' + i]) dataHost.push(process.env['REACT_APP_HOST_' + i]);
    if (window.location.host === process.env['REACT_APP_URL_' + i] && process.env['REACT_APP_HOST_' + i]) {
      return process.env['REACT_APP_HOST_' + i];
    }
  }
  return process.env['REACT_APP_HOST'] || dataHost[0];
})();
export const URL_HIS = (() => {
  const dataHost = [];
  for (let i = 0; i < 20; i++) {
    if (process.env['REACT_APP_HIS_URL_' + i]) dataHost.push(process.env['REACT_APP_HIS_URL_' + i]);
    if (window.location.host === process.env['REACT_APP_URL_' + i] && process.env['REACT_APP_HIS_URL_' + i]) {
      return process.env['REACT_APP_HIS_URL_' + i];
    }
  }
  return process.env['REACT_APP_HIS_URL_'] || dataHost[0];
})();

String.prototype.absoluteUrl =
  String.prototype.absolute ||
  function (defaultValue) {
    var _this = this.toString();
    if (_this == '')
      if (defaultValue != undefined) return defaultValue;
      else return _this;
    if (_this.startsWith('http') || _this.startsWith('blob')) {
      return _this;
    }
    if (_this.endsWith('.jpg') || _this.endsWith('.png') || _this.endsWith('.JPG') || _this.endsWith('.PNG') || _this.endsWith('.gif')) {
      return (_this + '').resolveResource();
    }
    if (!_this.endsWith('.jpg') || !_this.endsWith('.png') || _this.endsWith('.JPG') || _this.endsWith('.PNG') || !_this.endsWith('.gif')) {
      return defaultValue;
    }
    if (_this.startsWith('jira.isofh.com.vn')) return 'htts://' + _this + '';
    // if(this.startsWith("user"))
    //     return
    return server_url + _this + '';
  };

String.prototype.getTicketUrl =
  String.prototype.getTicketUrl ||
  function (defaultValue) {
    var _this = this.toString();
    if (_this == '')
      if (defaultValue != undefined) return defaultValue;
      else return _this;
    if (_this.startsWith('http') || _this.startsWith('blob')) {
      return _this;
    }
    if (_this.startsWith('jira.isofh.com.vn')) return 'htts://' + _this + '';
    // if(this.startsWith("user"))
    //     return
    return 'https://jira.isofh.com.vn/browse/' + _this + '';
  };

String.prototype.absoluteFileUrl =
  String.prototype.absoluteFileUrl ||
  function (defaultValue) {
    var _this = this.toString();
    if (_this == '')
      if (defaultValue != undefined) return defaultValue;
      else return _this;
    if (_this.startsWith('http') || _this.startsWith('blob')) {
      return _this;
    }
    return window.location.origin + '/view-file/' + _this + '';
  };

String.prototype.getServiceUrl =
  String.prototype.absolute ||
  function (defaultValue) {
    if (this == '')
      if (defaultValue != undefined) return defaultValue;
      else return this;
    if (this.startsWith('http') || this.startsWith('blob')) {
      return this;
    }
    return server_url + this;
  };

String.prototype.resolveResource =
  String.prototype.resolveResource ||
  function (defaultValue) {
    if (this == '')
      if (defaultValue != undefined) return defaultValue;
      else return this;
    if (this.startsWith('http') || this.startsWith('blob')) {
      return this;
    }
    return server_url + '/view-image/' + this;
  };

export default {
  // auth: "eyJhbGciOiJSUzI1NiJ9.eyJyb2xlIjoiaXNvZmhDYXJlIiwiY3JlYXRlZCI6MTU1MzA3MDc0Mzc4NiwidHlwZSI6MCwidXNlcklkIjo1NX0.k8B3Cm5M-22ckpKk3W1fhgHoHq7LGVdKIjhLZUl0abKES5nSCC5RhupsRXctTK6skQMvCZ8f-TuZGbDcNgdlsb_Kc0ogFmaPmGI4ao7MKrCb9nCr4fxztUN0ABWUERA1wnQNFljgVR9FIrNKnf2hx_aTHIrwS9Ol1JOaKJVnj83cK5vg2ExvN7ralb1yoyuHEZoODlDBVHCIxeG5X3oaJE6-BKfcafXau_cmYz-Ovg31VtZpu1lCffaOj2uLSefPBvqfL2d2U1sswiUrV95rankTjOomr31lP4xiCN71-7YX_6Hx7EraRFhmclmaOjGUWM83VB0fvY8hIEHiE8yB8w",
  auth: '',
  serverApi: server_url,
  uploadFile(url, file) {
    const formData = new FormData();
    formData.append('files', file);
    const config = {
      headers: {},
    };
    return axios.post(url.getServiceUrl(), formData, config);
  },
  requestApi(methodType, url, body) {
    return new Promise((resolve, reject) => {
      var dataBody = '';
      if (!body) body = {};
      dataBody = JSON.stringify(body);
      this.requestFetch(methodType, url && url.indexOf('http') == 0 ? url : url, {}, dataBody)
        .then((s) => {
          resolve(s);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  requestApi2(methodType, url, body) {
    return new Promise((resolve, reject) => {
      var dataBody = '';
      if (!body) body = {};
      dataBody = body;
      this.requestFetch(methodType, url && url.indexOf('http') == 0 ? url : url, {}, dataBody)
        .then((s) => {
          resolve(s);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  requestFetch(methodType = 'get', url, headers, body) {
    return new Promise((resolve, reject) => {
      let fetchParam = {
        method: methodType,
        headers,
      };
      methodType = methodType.toLowerCase();
      switch (methodType) {
        case 'get':
          axios
            .get(url.getServiceUrl())
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
              reject(error);
            });
          break;
        case 'put':
          axios
            .put(url.getServiceUrl(), body)
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
              reject(error);
            });
          break;
        case 'post':
          axios
            .post(url.getServiceUrl(), body)
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
              reject(error);
            });
      }
    });
  },

  downloadFile(methodType, url, headers, body) {
    return new Promise((resolve, reject) => {
      let fetchParam = {
        method: methodType,
        headers,
      };
      console.log(methodType, url, headers, body);
      if (methodType.toLowerCase() !== 'get') {
        fetchParam.body = body;
      }
      return fetch(url.getServiceUrl(), fetchParam)
        .then((json) => {
          resolve(json);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  requestService(url) {
    return new Promise(function (resolve, reject) {
      axios
        .get(server_url + url)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
};
