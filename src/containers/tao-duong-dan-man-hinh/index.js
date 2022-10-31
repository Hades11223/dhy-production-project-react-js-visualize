import actionInvoice from '@actions/invoice';
import companyImg from '@images/company.png';
import { DHY } from '@svg';
import { Button, Col, Input, InputNumber, Row, Select } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import './index.scss';
import CallCLS from "./components/thiet-lap-goi-so-cls"
const { Option } = Select;

const AutoGenerateLink = ({ getAllAreas, areas }) => {
  useEffect(() => {
    getAllAreas();
  }, []);

  const [visualizeShopInput, setvisualizeShopInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    group: '',
    doctorAccount: '',
    roomName: '',
    repeat: 0,
    urlHIS: '',
    timer: 0,
    speaker: true,
    openShopSpeaker: true,
  });

  const [generatedLinkTTNgoaiTru, setGeneratedLinkTTNgoaiTru] = useState('');

  const onChangeTTNgoaiTru = ({ target: { name, value: newValue } = {} }) => {
    setvisualizeShopInput({ [name]: newValue });
  };

  const onChangeTTNgoaiTruInput = (name) => (value) => {
    setvisualizeShopInput({ [name]: value });
  };

  const onGenerateLinkTTNgoaiTru = () => {
    const { speaker, openShopSpeaker, timer, repeat, group, roomName, urlHIS } = visualizeShopInput;
    setGeneratedLinkTTNgoaiTru(
      `${
        window.location.origin
      }/visualize/quay-thanh-toan-ngoai-tru?goiso=${speaker}&goiloaphong=${openShopSpeaker}&group=${group}&repeat=${repeat}&timer=${
        timer * 1000
      }&roomId=${roomName}&url=${encodeURI(urlHIS)}`
    );
  };

  const [generatedLinkVisualizeRoom, setGeneratedGeneralRoom] = useState('');
  const [generatedLinkVisualizeReception, setGeneratedGeneralReception] = useState('');
  const [generalRoomInput, setGeneralRoomInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    group: '',
    urlHIS: '',
    repeat: 0,
    timer: 0,
    listRoom: [],
    invoiceDoor: 'N',
  });

  const onChangeListRoom = (name) => (value) => {
    setGeneralRoomInput({ [name]: value.toString() });
  };
  const onChangeVisualizeInput = (name) => (value) => {
    setGeneralRoomInput({ [name]: value });
  };

  const onchangeGroupVisualizeInput = ({ target: { name, value: newValue } = {} }) => {
    setGeneralRoomInput({ [name]: newValue });
  };
  const onGenerateLinkVisualizeRoom = () => {
    const { listRoom, group, repeat, timer, urlHIS, invoiceDoor } = generalRoomInput;
    setGeneratedGeneralRoom(
      `${window.location.origin}/visualize?room=${listRoom}&group=${group}&repeat=${repeat}&timer=${
        timer * 1000
      }&invoiceDoor=${invoiceDoor}&url=${encodeURI(urlHIS)}`
    );
  };

  const onGenerateLinkVisualizeReception = () => {
    const { listRoom, group, repeat, timer, urlHIS } = generalRoomInput;
    setGeneratedGeneralReception(
      `${window.location.origin}/visualize/tiep-don?room=${listRoom}&group=${group}&repeat=${repeat}&speaker=2&timer=${
        timer * 1000
      }&url=${encodeURI(urlHIS)}`
    );
  };

  const [generatedLinkWaitingRoom, setGeneratedWaitingRoom] = useState('');
  const [waitingRoomInput, setWaitingRoomInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    group: '',
    timer: 0,
    listRoom: [],
  });

  const onChangeListWaitingRoom = (name) => (value) => {
    setWaitingRoomInput({ [name]: value.toString() });
  };

  const onChangeWaitingInput = (name) => (value) => {
    setWaitingRoomInput({ [name]: value });
  };

  const onchangeWaitingRoomInput = ({ target: { name, value: newValue } = {} }) => {
    setWaitingRoomInput({ [name]: newValue });
  };
  const onGenerateLinkWaitingRoom = () => {
    const { listRoom, group, timer } = waitingRoomInput;
    setGeneratedWaitingRoom(`${window.location.origin}/visualize/patients-wait?room=${listRoom}&roomName=${group}&timer=${timer * 1000}`);
  };

  const [generatedLinkThuNgan, setGeneratedInvoiceDoor] = useState('');
  const [invoiceDoorInput, setInvoiceDoorInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    roomId: '',
    urlHIS: '',
    timer: 0,
  });
  const [generatedLinkLaySoThuNgan, setGeneratedLinkLaySoThuNgan] = useState('');
  const [laySoInput, setLaySoInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    areaId: '',
    urlHIS: '',
  });

  const onchangeThuNganInput = ({ target: { name, value: newValue } = {} }) => {
    setInvoiceDoorInput({ [name]: newValue });
  };

  const onchangeInvoiceDoortimer = (name) => (value) => {
    setInvoiceDoorInput({ [name]: value.toString() });
  };

  const onGenerateLinkThuNgan = () => {
    const { roomId, urlHIS, timer } = invoiceDoorInput;
    setGeneratedInvoiceDoor(`${window.location.origin}/visualize/thu-ngan?room=${roomId}&timer=${timer * 1000}&url=${encodeURI(urlHIS)}`);
  };

  const onChangeArea = (name) => (value) => {
    setLaySoInput({ [name]: value });
  };

  const onchangeLaySoInput = ({ target: { name, value: newValue } = {} }) => {
    setLaySoInput({ [name]: newValue });
  };
  const onGenerateLinkLaySoThuNgan = () => {
    const { areaId, urlHIS } = laySoInput;
    if (urlHIS) {
      setGeneratedLinkLaySoThuNgan(`${window.location.origin}/visualize/lay-so-thu-ngan?area=${areaId}&url=${encodeURI(urlHIS)}`);
    } else {
      setGeneratedLinkLaySoThuNgan(`${window.location.origin}/visualize/lay-so-thu-ngan?area=${areaId}`);
    }
  };

  const [generatedLinkGoiSoPK, generateLinkGoiSoPK] = useState('');
  const [goiSoPKInput, setGoiSoPKInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    group: '',
    urlHIS: '',
    repeat: 0,
    timer: 0,
    goiso: true,
    goiloaphong: true,
    roomId: '',
    doctorName: '',
    nurseName: '',
  });

  const handleOnchangeGoiSoPK = ({ target: { name, value: newValue } = {} }) => {
    setGoiSoPKInput({ [name]: newValue });
  };

  const onChangeGoiSoPKInput = (name) => (value) => {
    setGoiSoPKInput({ [name]: value });
  };

  const taoLinkGoiSoPK = () => {
    const { roomId, urlHIS, timer, goiso, goiloaphong, group, repeat } = goiSoPKInput;
    generateLinkGoiSoPK(
      `${
        window.location.origin
      }/visualize/goi-so-phong-kham?goiso=${goiso}&goiloaphong=${goiloaphong}&group=${group}&repeat=${repeat}&timer=${
        timer * 1000
      }&roomId=${roomId}&url=${encodeURI(urlHIS)}`
    );
  };

  useEffect(() => {
    const listHash = ['#1', '#2', '#3', '#4', '#5'];
    if (listHash.includes(window.location.hash)) {
      const hash = window.location.hash.slice(1);
      scroller.scrollTo(hash, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  }, [window.location.hash]);

  return (
    <div className="wrapper-auto-generate-link">
      <div className="header">
        <Row>
          <Col md={5} lg={5} xl={5}>
            <div className="logo-customer">
              <DHY />
            </div>
          </Col>
          <Col md={14} lg={14} xl={14}>
            <div className="title-panel">
              <h2>Tạo đường dẫn màn hình</h2>
            </div>
          </Col>
          <Col md={5} lg={5} xl={5}>
            <div className="logo-company">
              <img src={companyImg} alt="" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">
        <p style={{ color: 'red' }}>
          <b>Lưu ý 1:</b>{' '}
          <small>
            Chế độ đọc loa là tiến trình chạy ngầm, autoplay. Do đó để đảm bảo hoạt động được, cần refresh/active tab bằng cách click vào
            logo góc trái trên cùng màn hình ở <b>lần đầu tiên</b> mở tab <b>trước</b> khi thực hiện bất kì thao tác đẩy thông tin vào màn
            hình (Ví dụ trên HIS...).
          </small>
          <br />
          <b>Lưu ý 2:</b>{' '}
          <small>
            {' '}
            Việc sửa trực tiếp config trên thanh địa chỉ sẽ khiến việc đọc loa hoạt động không đúng. Cần sử dụng Lưu ý 1 hoặc config từ page
            này để tạo link mới.
          </small>
        </p>
        {/* <div className="generate-call-room">
          <div className="title-generate-room">
            <Element name="1" className="element">
              <Link to="/#1">
                <h3>#1. Thiết lập quầy thanh toán ngoại trú</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field timer">
                  <div className="label">thời gian cập nhật giữ liệu (giây)</div>
                  <InputNumber name="timer" min={0} onChange={onChangeTTNgoaiTruInput('timer')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">mã quầy</div>
                  <Input onChange={onChangeTTNgoaiTru} name="roomName" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">mã khoa</div>
                  <Input onChange={onChangeTTNgoaiTru} name="group" />
                </div>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div>
                  <div className="field">
                    <div className="label visible-hidden">Bật chế độ đọc loa</div>
                    Bật chế độ đọc loa <Switch defaultChecked onChange={onChangeTTNgoaiTruInput('speaker')} />
                  </div>
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label visible-hidden">Bật đọc loa tại quầy</div>
                  Bật đọc loa quầy <Switch defaultChecked onChange={onChangeTTNgoaiTruInput('openShopSpeaker')} />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">số lần đọc loa</div>
                  <InputNumber name="repeat" min={0} onChange={onChangeTTNgoaiTruInput('repeat')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">địa chỉ HIS</div>
                  <Input onChange={onChangeTTNgoaiTru} name="urlHIS" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6} lg={6} xl={6}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkTTNgoaiTru} className="w-100">
                    Tạo link
                  </Button>
                </div>
              </Col>
              <Col md={14} lg={14} xl={14} offset={2}>
                <Input className="generated-link" value={generatedLinkTTNgoaiTru} />
              </Col>
            </Row>
          </div>
        </div>
        <hr />
        <div className="generate-call-room">
          <div className="title-generate-room">
            <Element name="2" className="element">
              <Link to="/#2">
                <h3>#2. Thiết lập màn gọi số phòng khám</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field timer">
                  <div className="label">thời gian cập nhật giữ liệu (giây)</div>
                  <InputNumber name="timer" min={0} onChange={onChangeGoiSoPKInput('timer')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">mã quầy</div>
                  <Input onChange={handleOnchangeGoiSoPK} name="roomId" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">mã khoa</div>
                  <Input onChange={handleOnchangeGoiSoPK} name="group" />
                </div>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">số lần đọc loa</div>
                  <InputNumber name="repeat" min={0} onChange={onChangeGoiSoPKInput('repeat')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div>
                  <div className="field">
                    <div className="label visible-hidden">Bật chế độ đọc loa</div>
                    Bật chế độ đọc loa <Switch defaultChecked onChange={onChangeGoiSoPKInput('goiso')} />
                  </div>
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label visible-hidden">Bật đọc loa tại quầy</div>
                  Bật đọc loa quầy <Switch defaultChecked onChange={onChangeGoiSoPKInput('goiloaphong')} />
                </div>
              </Col>

              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">địa chỉ HIS</div>
                  <Input onChange={handleOnchangeGoiSoPK} name="urlHIS" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6} lg={6} xl={6}>
                <div className="action-btn">
                  <Button type="primary" onClick={taoLinkGoiSoPK} className="w-100">
                    Tạo link
                  </Button>
                </div>
              </Col>
              <Col md={14} lg={14} xl={14} offset={2}>
                <Input className="generated-link" value={generatedLinkGoiSoPK} />
              </Col>
            </Row>
          </div>
        </div>
        <hr /> */}
        <div className="generate-visualize-room mt-4">
          <div className="title-generate-room">
            <Element name="3" className="element">
              <Link to="/#3">
                <h3>#1. lập màn hình tổng</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">Mã Quầy</div>
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    onChange={onChangeListRoom('listRoom')}
                    tokenSeparators={[',']}
                    defaultValue={[]}
                  />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">mã khoa</div>
                  <Input onChange={onchangeGroupVisualizeInput} name="group" className="custom-input-number w-80" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">số lần đọc</div>
                  <InputNumber name="repeat" min={0} onChange={onChangeVisualizeInput('repeat')} className="w-100" />
                </div>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field timer">
                  <div className="label">thời gian cập nhật dữ liệu (giây)</div>
                  <InputNumber name="timer" min={0} onChange={onChangeVisualizeInput('timer')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">địa chỉ HIS</div>
                  <Input onChange={onchangeGroupVisualizeInput} name="urlHIS" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">Màn hình tổng phục vụ cho:</div>
                  <Select defaultValue="N" style={{ width: 160 }} name="invoiceDoor" onChange={onChangeVisualizeInput('invoiceDoor')}>
                    <Option value="Y">Thanh toán</Option>
                    <Option value="N">Khám bệnh</Option>
                  </Select>
                </div>
              </Col>
            </Row>
            <Row className="mt-3" gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkVisualizeRoom} className="w-100">
                    Tạo link
                  </Button>
                </div>
              </Col>
              <Col md={14} lg={14} xl={14}>
                <Input className="generated-link" value={generatedLinkVisualizeRoom} />
              </Col>
            </Row>
          </div>
        </div>
        {/* <hr />
        <div className="generate-visualize-room mt-4">
          <div className="title-generate-room">
            <Element name="4" className="element">
              <Link to="/#4">
                <h3>#4. thiết lập màn hình cho điều dưỡng/thu ngân</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">Mã Quầy</div>
                  <Input onChange={onchangeThuNganInput} name="roomId" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field timer">
                  <div className="label">thời gian cập nhật dữ liệu (giây)</div>
                  <InputNumber name="timer" min={0} onChange={onchangeInvoiceDoortimer('timer')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">địa chỉ HIS</div>
                  <Input onChange={onchangeThuNganInput} name="urlHIS" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3" gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkThuNgan} className="w-100">
                    Tạo link
                  </Button>
                </div>
              </Col>
              <Col md={14} lg={14} xl={14}>
                <Input className="generated-link" value={generatedLinkThuNgan} />
              </Col>
            </Row>
          </div>
        </div>
        <hr />
        <div className="generate-visualize-room mt-4">
          <div className="title-generate-room">
            <Element name="5" className="element">
              <Link to="/#5">
                <h3>#5. thiết lập màn hình đợi khám Cận lâm sàng</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">Tên Phòng</div>
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    onChange={onChangeListWaitingRoom('listRoom')}
                    tokenSeparators={[',']}
                    defaultValue={[]}
                  />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">tên Khoa</div>
                  <Input onChange={onchangeWaitingRoomInput} name="group" className="custom-input-number w-80" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">thời gian cập nhật dữ liệu (giây)</div>
                  <InputNumber name="timer" min={0} onChange={onChangeWaitingInput('timer')} className="w-100" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3" gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkWaitingRoom} className="w-100">
                    Tạo link
                  </Button>
                </div>
              </Col>
              <Col md={14} lg={14} xl={14}>
                <Input className="generated-link" value={generatedLinkWaitingRoom} />
              </Col>
            </Row>
          </div>
        </div>
        <div className="generate-visualize-room mt-4">
          <div className="title-generate-room">
            <Element name="5" className="element">
              <Link to="/#5">
                <h3>#6. Thiết lập màn cây lấý số</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">Khu vực</div>
                  <Select
                    style={{ width: '100%' }}
                    onChange={onChangeArea("areaId")}
                    defaultValue={[]}
                  >
                    {areas?.map((option) => {
                      return(
                        <Option key={option.HIS_Area_ID} value={option.HIS_Area_ID}>
                          {option.Name}
                        </Option>)})
                    }

                  </Select>
                </div>
              </Col>
              <Col md={15} lg={16} xl={16}>
                <div className="field">
                  <div className="label">địa chỉ HIS</div>
                  <Input onChange={onchangeLaySoInput} name="urlHIS" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3" gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkLaySoThuNgan} className="w-100">
                    Tạo link
                  </Button>
                </div>
              </Col>
              <Col md={14} lg={14} xl={14}>
                <Input className="generated-link" value={generatedLinkLaySoThuNgan} />
              </Col>
            </Row>
          </div>
        </div>
        <div className="generate-visualize-room mt-4">
          <div className="title-generate-room">
            <Element name="7" className="element">
              <Link to="/#7">
                <h3>#7. Thiết lập gọi số tiếp đón tổng</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">Mã Quầy</div>
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    onChange={onChangeListRoom('listRoom')}
                    tokenSeparators={[',']}
                    defaultValue={[]}
                  />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">mã khoa</div>
                  <Input onChange={onchangeGroupVisualizeInput} name="group" className="custom-input-number w-80" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">số lần đọc</div>
                  <InputNumber name="repeat" min={0} onChange={onChangeVisualizeInput('repeat')} className="w-100" />
                </div>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field timer">
                  <div className="label">thời gian cập nhật dữ liệu (giây)</div>
                  <InputNumber name="timer" min={0} onChange={onChangeVisualizeInput('timer')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">địa chỉ HIS</div>
                  <Input onChange={onchangeGroupVisualizeInput} name="urlHIS" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3" gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkVisualizeReception} className="w-100">
                    Tạo link
                  </Button>
                </div>
              </Col>
              <Col md={14} lg={14} xl={14}>
                <Input className="generated-link" value={generatedLinkVisualizeReception} />
              </Col>
            </Row>
          </div>
        </div> */}
        <CallCLS />
      </div>
    </div>
  );
};
export default connect(
  (state) => ({
    areas: state.invoice.areas || [],
  }),
  {
    getAllAreas: actionInvoice.getAllAreas,
  }
)(AutoGenerateLink);
