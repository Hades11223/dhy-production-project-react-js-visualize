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
              <h2>T???o ???????ng d???n m??n h??nh</h2>
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
          <b>L??u ?? 1:</b>{' '}
          <small>
            Ch??? ????? ?????c loa l?? ti???n tr??nh ch???y ng???m, autoplay. Do ???? ????? ?????m b???o ho???t ?????ng ???????c, c???n refresh/active tab b???ng c??ch click v??o
            logo g??c tr??i tr??n c??ng m??n h??nh ??? <b>l???n ?????u ti??n</b> m??? tab <b>tr?????c</b> khi th???c hi???n b???t k?? thao t??c ?????y th??ng tin v??o m??n
            h??nh (V?? d??? tr??n HIS...).
          </small>
          <br />
          <b>L??u ?? 2:</b>{' '}
          <small>
            {' '}
            Vi???c s???a tr???c ti???p config tr??n thanh ?????a ch??? s??? khi???n vi???c ?????c loa ho???t ?????ng kh??ng ????ng. C???n s??? d???ng L??u ?? 1 ho???c config t??? page
            n??y ????? t???o link m???i.
          </small>
        </p>
        {/* <div className="generate-call-room">
          <div className="title-generate-room">
            <Element name="1" className="element">
              <Link to="/#1">
                <h3>#1. Thi???t l???p qu???y thanh to??n ngo???i tr??</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field timer">
                  <div className="label">th???i gian c???p nh???t gi??? li???u (gi??y)</div>
                  <InputNumber name="timer" min={0} onChange={onChangeTTNgoaiTruInput('timer')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">m?? qu???y</div>
                  <Input onChange={onChangeTTNgoaiTru} name="roomName" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">m?? khoa</div>
                  <Input onChange={onChangeTTNgoaiTru} name="group" />
                </div>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div>
                  <div className="field">
                    <div className="label visible-hidden">B???t ch??? ????? ?????c loa</div>
                    B???t ch??? ????? ?????c loa <Switch defaultChecked onChange={onChangeTTNgoaiTruInput('speaker')} />
                  </div>
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label visible-hidden">B???t ?????c loa t???i qu???y</div>
                  B???t ?????c loa qu???y <Switch defaultChecked onChange={onChangeTTNgoaiTruInput('openShopSpeaker')} />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">s??? l???n ?????c loa</div>
                  <InputNumber name="repeat" min={0} onChange={onChangeTTNgoaiTruInput('repeat')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">?????a ch??? HIS</div>
                  <Input onChange={onChangeTTNgoaiTru} name="urlHIS" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6} lg={6} xl={6}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkTTNgoaiTru} className="w-100">
                    T???o link
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
                <h3>#2. Thi???t l???p m??n g???i s??? ph??ng kh??m</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field timer">
                  <div className="label">th???i gian c???p nh???t gi??? li???u (gi??y)</div>
                  <InputNumber name="timer" min={0} onChange={onChangeGoiSoPKInput('timer')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">m?? qu???y</div>
                  <Input onChange={handleOnchangeGoiSoPK} name="roomId" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">m?? khoa</div>
                  <Input onChange={handleOnchangeGoiSoPK} name="group" />
                </div>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">s??? l???n ?????c loa</div>
                  <InputNumber name="repeat" min={0} onChange={onChangeGoiSoPKInput('repeat')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div>
                  <div className="field">
                    <div className="label visible-hidden">B???t ch??? ????? ?????c loa</div>
                    B???t ch??? ????? ?????c loa <Switch defaultChecked onChange={onChangeGoiSoPKInput('goiso')} />
                  </div>
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label visible-hidden">B???t ?????c loa t???i qu???y</div>
                  B???t ?????c loa qu???y <Switch defaultChecked onChange={onChangeGoiSoPKInput('goiloaphong')} />
                </div>
              </Col>

              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">?????a ch??? HIS</div>
                  <Input onChange={handleOnchangeGoiSoPK} name="urlHIS" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6} lg={6} xl={6}>
                <div className="action-btn">
                  <Button type="primary" onClick={taoLinkGoiSoPK} className="w-100">
                    T???o link
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
                <h3>#1. l???p m??n h??nh t???ng</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">M?? Qu???y</div>
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
                  <div className="label">m?? khoa</div>
                  <Input onChange={onchangeGroupVisualizeInput} name="group" className="custom-input-number w-80" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">s??? l???n ?????c</div>
                  <InputNumber name="repeat" min={0} onChange={onChangeVisualizeInput('repeat')} className="w-100" />
                </div>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field timer">
                  <div className="label">th???i gian c???p nh???t d??? li???u (gi??y)</div>
                  <InputNumber name="timer" min={0} onChange={onChangeVisualizeInput('timer')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">?????a ch??? HIS</div>
                  <Input onChange={onchangeGroupVisualizeInput} name="urlHIS" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">M??n h??nh t???ng ph???c v??? cho:</div>
                  <Select defaultValue="N" style={{ width: 160 }} name="invoiceDoor" onChange={onChangeVisualizeInput('invoiceDoor')}>
                    <Option value="Y">Thanh to??n</Option>
                    <Option value="N">Kh??m b???nh</Option>
                  </Select>
                </div>
              </Col>
            </Row>
            <Row className="mt-3" gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkVisualizeRoom} className="w-100">
                    T???o link
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
                <h3>#4. thi???t l???p m??n h??nh cho ??i???u d?????ng/thu ng??n</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">M?? Qu???y</div>
                  <Input onChange={onchangeThuNganInput} name="roomId" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field timer">
                  <div className="label">th???i gian c???p nh???t d??? li???u (gi??y)</div>
                  <InputNumber name="timer" min={0} onChange={onchangeInvoiceDoortimer('timer')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">?????a ch??? HIS</div>
                  <Input onChange={onchangeThuNganInput} name="urlHIS" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3" gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkThuNgan} className="w-100">
                    T???o link
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
                <h3>#5. thi???t l???p m??n h??nh ?????i kh??m C???n l??m s??ng</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">T??n Ph??ng</div>
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
                  <div className="label">t??n Khoa</div>
                  <Input onChange={onchangeWaitingRoomInput} name="group" className="custom-input-number w-80" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">th???i gian c???p nh???t d??? li???u (gi??y)</div>
                  <InputNumber name="timer" min={0} onChange={onChangeWaitingInput('timer')} className="w-100" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3" gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkWaitingRoom} className="w-100">
                    T???o link
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
                <h3>#6. Thi???t l???p m??n c??y l????? s???</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">Khu v???c</div>
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
                  <div className="label">?????a ch??? HIS</div>
                  <Input onChange={onchangeLaySoInput} name="urlHIS" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3" gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkLaySoThuNgan} className="w-100">
                    T???o link
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
                <h3>#7. Thi???t l???p g???i s??? ti???p ????n t???ng</h3>
              </Link>
            </Element>
          </div>
          <div className="create-form">
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">M?? Qu???y</div>
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
                  <div className="label">m?? khoa</div>
                  <Input onChange={onchangeGroupVisualizeInput} name="group" className="custom-input-number w-80" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field repeat">
                  <div className="label">s??? l???n ?????c</div>
                  <InputNumber name="repeat" min={0} onChange={onChangeVisualizeInput('repeat')} className="w-100" />
                </div>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="field timer">
                  <div className="label">th???i gian c???p nh???t d??? li???u (gi??y)</div>
                  <InputNumber name="timer" min={0} onChange={onChangeVisualizeInput('timer')} className="w-100" />
                </div>
              </Col>
              <Col md={8} lg={8} xl={8}>
                <div className="field">
                  <div className="label">?????a ch??? HIS</div>
                  <Input onChange={onchangeGroupVisualizeInput} name="urlHIS" />
                </div>
              </Col>
            </Row>
            <Row className="mt-3" gutter={[8, 8]}>
              <Col md={8} lg={8} xl={8}>
                <div className="action-btn">
                  <Button type="primary" onClick={onGenerateLinkVisualizeReception} className="w-100">
                    T???o link
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
