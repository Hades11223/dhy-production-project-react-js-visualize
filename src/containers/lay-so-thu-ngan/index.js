import React, { useState, useEffect } from 'react';
import printJS from "print-js";
import GroupAudio from '@components/GroupAudio';
import rectangeImg from '@images/rectangle.png';
import { Row, Col, message, Input } from 'antd';
import logoImg from '@images/logo.png';
import companyImg from '@images/logo-isofh-white.png';
import './style.scss';
import invoiceProvier from '@data-access/invoice-provider';
const queryString = require('query-string');
let timer = null;

const Index = ({
}) => {
  const parsed = queryString.parse(window.location.search);
  const [state, _setState] = useState({
    data: {},
    infoCheckin: {},
    success: false,
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  useEffect(() => {
    let hisURL = parsed.url || '';
    if (hisURL[hisURL.length - 1] === '/') {
      hisURL = hisURL.slice(0, hisURL.length - 1);
    }
    if (!hisURL) {
      hisURL = process.env.REACT_APP_HIS_URL;
    }
    setState({ hisURL: hisURL });
    setState({ HIS_Area_ID: Number(parsed.area) || 0 });
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const onChange = (key, needEnter) => (e, item) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    setState({
      [key]: value,
    });
    if (needEnter) return;
    if (key === "qrBN") {
      if (/^[0-9]+$/.test(value)) {
        handleSearchBN(value);
      }
    }
  };

  const handleSearchBN = (value) => {
    const { qrBN = "" } = state;
    let str = qrBN.trim() || value || "";
    let param = {};
    if (/^[0-9]+$/.test(str)) {
      param = { HIS_PatientDocument: str };
    } else {
      let arr = (str && str.split(",")) || [];
      let children = [];
      children = arr.filter((el) => {
        let convertEl = el.includes("”") ? el.split("”") : el.split('"');
        return convertEl.some((et) => et === "maHoSo");
      });
      children = (children.length && children[0]) || "";
      let res = children
        ? children.includes("”")
          ? children.split("”")
          : children.split('"')
        : [];
      res = res.filter((et) => /^[0-9]+$/.test(et));
      if (res.length) {
        if (res[0].length >= 10) {
          param = { HIS_PatientDocument: res[0] };
        }
      }
    }
    if (param?.HIS_PatientDocument) {
      // Search info nb
      param.HIS_Area_ID = state.HIS_Area_ID;
      invoiceProvier.checkin(state.hisURL, param)
        .then((s) => {
          if (s.code === 0 && s?.data) {
            let data = s.data;
            setState({ infoCheckin: data, mess: s?.comment });
            data?.SequenceNo ? setState({ success: true }) : setState({ success: false })
            getForm(state.hisURL, data?.HIS_Storage_Document_ID || 0);
          }else{
            setState({ infoCheckin: {}, mess: s?.comment, success: false });
          }
        })
        .catch((e) => {
          notifiNotSearch(e.message);
          setState({ infoCheckin: {}, mess: e.message, success: false });
        })
    } else {
      if (str) {
        notifiNotSearch("Mã hồ sơ sai định dạng");
      } else message.error("Xin vui lòng quẹt thẻ hoặc nhập thông tin để lấy số thứ tự");
    }
    setState({ qrBN: null })
  };
  const notifiNotSearch = (mess) => {
    message.error(mess);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchBN();
    }
  };

  const getForm = (url, id) => {
    if (!id) {
      return;
    }
    invoiceProvier.getForm(url, id).then((s) => {
      convertAndPrintPDF(s);
    }).catch(() => { })

  }

  const printPDF = (filePDF) => {
    if (!filePDF) return;
    const blob = new Blob([new Uint8Array(filePDF)], {
      type: "application/pdf",
    });

    const blobUrl = window.URL.createObjectURL(blob);
    // printJS({
    //   printable: blobUrl,
    //   type: "pdf",
    // });
    const print = window.open(blobUrl, "PRINT", "height=100,width=100 ,visible=none, _blank");
    print.addEventListener('load', (() => {
      print.print()
      setTimeout(() => {
        print.close();
      }, 1500);
    }))
  };

  const convertAndPrintPDF = (pdf) => {
    if (pdf) {
      pdf.arrayBuffer()
        .then((s) => {
          printPDF(s);
        })
        .catch((e) => console.log("pdf", e));
    }
  };

  return (
    <div className="visualize">
      <div className="body-wrapper">
        <div className="header">
          <Row>
            <Col md={8}>
              <div className="logo">
                <img src={logoImg} alt="" onClick={handleRefresh} aria-hidden="true" />
              </div>
              <div className="text">
                BỆNH VIỆN ĐA KHOA
              <br />
                <span className="hospital"> XANH PÔN </span>
              </div>
            </Col>
            <Col md={16}>
              <h1>
                <img className="rec" src={rectangeImg} alt="" />
                <span className="title">LẤY SỐ PHÁT THUỐC</span>
              </h1>

              <div className="logo-isofh">
                <img src={companyImg} alt="" />
              </div>
            </Col>
          </Row>

        </div>
        <div className="content">
          <Row>
            <Col md={8}>
              <div className="left-content">
                <div className="left-content-text">
                  Xin vui lòng quẹt thẻ hoặc nhập thông tin vào ô bên dưới để lấy số thứ tự
                </div>
                <div className="left-content-info">Mã hồ sơ</div>
                <div>
                  <Input className="left-content-input"
                    autoFocus
                    value={state.qrBN}
                    onChange={onChange("qrBN", true)}
                    onKeyDown={onKeyDown} />
                </div>
              </div>
            </Col>
            <Col md={16}>
              <div className="right-content">
                <div className="right-content-header">
                  STT ĐÃ LẤY
                </div>
                {state.success && (
                  <>
                    <div className="right-content-stt">{state.infoCheckin.SequenceNo}</div>
                    <div className="right-content-door">{state.infoCheckin.InvoiceDoor}
                    </div>
                    <div className="right-content-patient">
                      <span className="patient-name">{state.infoCheckin.PatientName}</span>
                      <span className="patient-age"> ({state.infoCheckin.Age} tuổi)</span>
                    </div>
                  </>)
                }
                {!state.success && state.mess && (
                  <>
                    <div className="right-content-patient">
                      <div className ="content-message">
                        {state.mess}
                      </div>
                     {state.infoCheckin && state.infoCheckin.PatientName && (
                        <div>
                        <span className="patient-name">{state.infoCheckin.PatientName}</span>
                        <span className="patient-age"> ({state.infoCheckin.Age} tuổi)</span>
                      </div>
                     )}
                    </div>
                  </>)
                }
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Index;
