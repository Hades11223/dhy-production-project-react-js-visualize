import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import actionRoom from '@actions/room';
import useInterval from '@hook/useInterval';
import dollarGreenImg from '@images/dollar-green.png';
import profileProvider from '@data-access/profile-provider';
import logoImg from '@images/logo.png';
import companyImg from '@images/company.png';
import './index.scss';
const queryString = require('query-string');

const VisualizeListWaiting = ({ getRoom, rooms }) => {
  const parsed = queryString.parse(window.location.search);
  const [listWorkWaitCurrentRoom, setListWorkWait] = useState({});

  useEffect(() => {
    let hisURL = parsed.url || '';
    if (hisURL[hisURL.length - 1] === '/') {
      hisURL = hisURL.slice(0, hisURL.length - 1);
    }
    // IsInvoiceDoor: Yes/No ~ Y/N
    if (parsed.room) getRoom(hisURL, parsed.room, 'Y');
  }, []);
  const currentRoomInformation = rooms[parsed.room] || {};

  useInterval(() => {
    profileProvider
      .getWorkWait(parsed.room)
      .then((s) => {
        try {
          if (s.code === 0) {
            const currentRoom = s.data.find((item) => item.room === parsed.room) || {};
            setListWorkWait(currentRoom);
          }
        } catch (error) {}
      })
      .catch(() => {});
  }, parsed.timer || 1000);

  const workingPatient = (Array.isArray(listWorkWaitCurrentRoom.work) && listWorkWaitCurrentRoom.work[0]) || {};
  const listWaitPatients = (Array.isArray(listWorkWaitCurrentRoom.wait) && listWorkWaitCurrentRoom.wait) || [];

  return (
    <div className="visualize-list-waiting">
      <div className="body-wrapper">
        <div className="header">
          <h1>
            <img src={dollarGreenImg} alt="" />
            {currentRoomInformation.Department_Name || 'QUẦY THANH TOÁN NGOẠI TRÚ'}
          </h1>
          <div className="logo">
            <img src={logoImg} alt=""></img>
          </div>
          <div className="logo-isofh">
            <img src={companyImg} alt=""></img>
          </div>
        </div>
        <div className="content">
          <div className="shop">
            <div className="shop-header">Đang thực hiện</div>
            <div className="shop-content">
              <div className="working">
                <div className="stt">
                  <p className="status">đang thực hiện</p>
                  <p className="number">{workingPatient.code || '00'}</p>
                </div>
                <div className="info">
                  {workingPatient.name && (
                    <>
                      <div className="name">
                        <div>
                          <img src={dollarGreenImg} alt="" />
                        </div>
                        <div className="text">{workingPatient.name}</div>
                      </div>
                      <div className="age">{workingPatient.age}tuổi</div>
                    </>
                  )}
                </div>
              </div>
              <div className="waiting">
                <div className="status">
                  chờ thực hiện <span>Có {listWaitPatients.length || 0} bệnh nhân nhỡ</span>
                </div>
                <div className="list-waiting">
                  {listWaitPatients.map((patient) => (
                    <div className="patient" key={patient.id}>
                      <div className="stt">{patient.code}</div>
                      <div className="name">{patient.name}</div>
                      <div className="age">{patient.age}tuổi</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    rooms: state.room.rooms || {},
  }),
  {
    getRoom: actionRoom.getRoom,
  }
)(VisualizeListWaiting);
