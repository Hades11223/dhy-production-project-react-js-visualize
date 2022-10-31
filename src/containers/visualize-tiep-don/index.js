import React, { useState } from 'react';
import useInterval from '@hook/useInterval';
import TiepDon from '@components/TiepDon';
import GroupAudio from '@components/GroupAudio';
import profileProvider from '@data-access/profile-provider';
import dollarGreenImg from '@images/dollar-green2.png';
import logoImg from '@images/logo_spaul.png';
import companyImg from '@images/logo-isofh.png';
import './style.scss';
import { connect } from "react-redux";
const queryString = require('query-string');
const VisualizeTiepDon = (props) => {

  const parsed = queryString.parse(window.location.search);
  const [state, _setState] = useState({
    data: {},
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  useInterval(() => {
    profileProvider
      .getWorkWait(parsed.room)
      .then((s) => {
        try {
          const data = {};
          parsed.room.split(',').forEach((item) => {
            data[item] = s.data.find((item2) => item2.room === item) || {};
          });
          setState({
            data,
          });
        } catch (error) { }
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, parsed.timer || 1000);
  const rooms = (parsed.room || '').split(',');
  const colWidth = 100 / Math.round(rooms.length / 2);

  const handleRefresh = () => {
    window.location.reload();
  }

  return (
    <div className="visualize">
      <GroupAudio group={parsed.group} repeat={parsed.repeat} speaker={parsed.speaker} />
      <div className="body-wrapper">
        <div className="header">
          <div className="title">QUẦY TIẾP ĐÓN NGOẠI TRÚ</div>
          <div className="logo">
            <img src={logoImg} alt="" onClick={handleRefresh} aria-hidden="true" />
            <div className="text">
              BỆNH VIỆN ĐA KHOA
              <br />
              <span className="hospital"> XANH PÔN </span>
            </div>
          </div>
          <div className="logo-isofh">
            <img src={companyImg} alt="" />
          </div>
        </div>
        <div className="content">
          {rooms.length > 0 &&
            rooms.map((room, index) => (
              <div style={{ width: `${colWidth}%` }} key={`${room}-${index + 1}`}>
                <TiepDon
                  roomId={room}
                  workwait={state.data[room]}
                  url={parsed.url}
                  colWidth={colWidth}
                  isInvoiceDoor={parsed.invoiceDoor}
                  rooms={rooms.length}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
export default connect(
  (state) => ({
    audio: state.audio.audio || [],
  }),
  {
  }
)(VisualizeTiepDon);