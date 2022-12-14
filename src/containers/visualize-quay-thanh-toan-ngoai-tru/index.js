import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useInterval from '@hook/useInterval';
import actionRoom from '@actions/room';
import profileProvider from '@data-access/profile-provider';
import { playSound } from '@utils/sound-utils';
import dollarImg from '@images/dollar.png';
import logoImg from '@images/logo.png';
import logoIsofh from '@images/logo-isofh.png';
import frameImg from '@images/frame-img.png';
import GroupAudio from '@components/GroupAudio';
import './style.scss';
import { useSelector } from 'react-redux';
const queryString = require('query-string');

const VisualizeShop = ({ getRoom, rooms }) => {
  const parsed = queryString.parse(window.location.search);
  const [departmentInfo, setCurrentDepartment] = useState({});
  const [isGlobalSound, setGlobalSound] = useState(false);
  useEffect(() => {
    if (parsed.goiso === 'true' && parsed.goiloaphong === 'false') {
      setGlobalSound(true);
    }
  }, [parsed.goiso, parsed.goiloaphong]);

  useEffect(() => {
    // REF: https://www.w3.org/TR/navigation-timing/#performancenavigation
    if (window.performance.navigation.type === 0) {
      window.location.reload();
    }
  }, [window.performance.navigation.type]);

  useInterval(() => {
    profileProvider
      .getWorkWait(parsed.roomId)
      .then((s) => {
        try {
          if (s.code === 0) {
            const currentDepartment = s.data.find((item) => item.room === parsed.roomId) || {};
            setCurrentDepartment(currentDepartment);
            if (parsed.goiso === 'true' && parsed.goiloaphong === 'true') {
              const workingUser = currentDepartment.work;
              if (workingUser.length === 0) return;
              profileProvider.getAudioByRoom(workingUser[0].terminal, parsed.repeat).then((response) => {
                if (Array.isArray(response.data) && response.data.length > 0) {
                  playSound(`/api/audio/${response.data[0].audio}`);
                }
              });
            }
          }
        } catch (error) {}
      })
      .catch(() => {});
  }, parsed.timer || 1000);

  useEffect(() => {
    let hisURL = parsed.url || '';
    if (hisURL[hisURL.length - 1] === '/') {
      hisURL = hisURL.slice(0, hisURL.length - 1);
    }
    // IsInvoiceDoor: Yes/No ~ Y/N
    if (parsed.roomId) getRoom(hisURL, parsed.roomId, 'Y');
  }, []);

  const room = useSelector((state) => state.room['room_' + parsed.roomId])|| {};

  const currentPatient = (departmentInfo.work || [])[0] || {};
  const waitingPatient = (departmentInfo.wait || []).filter((item, index) => index < 6);
  return (
    <div className="payment-shop">
      <div className="body-wrapper">
        <div className="header">
          <div className="left">
            <div className="img">
              <img src={logoImg} alt="" />
            </div>
            <div className="text">
              B???NH VI???N ??A KHOA
              <br />
              <span className="hospital"> XANH P??N </span>
            </div>
          </div>
          <div className="right">
            <div className="text">
              <h1>QU???Y THANH TO??N NGO???I TR??</h1>
              <div className="counter-wrapper">
                <img src={dollarImg} alt="" />
                <label>{room.Name && room.Name.toUpperCase()}</label>
              </div>
            </div>
            <div className="img">
              <img src={logoIsofh} alt="" />
            </div>
          </div>
        </div>
        {isGlobalSound && <GroupAudio group={parsed.group} repeat={parsed.repeat} />}
        <div className="content">
          <div className="number-working">
            <h2>M???I V??O TH???C HI???N</h2>
            <p className="number">{currentPatient.code}</p>
            <div className="info-patient">
              <p className="fullname">{currentPatient.name}</p>
              <p className="age">{currentPatient.age && `(${currentPatient.age} tu???i)`}</p>
              <p className="fullname" style= {{color:"#ef4123"}}>{currentPatient.reason && `${currentPatient.reason}`}</p>
            </div>
          </div>
          <div className="list-call-fail">
            <h2>
              <img src={frameImg} alt=""></img> DANH S??CH CH???
            </h2>
            <div className="list-content">
              <ul>
                {waitingPatient.map((record) => (
                  <li key={record.code}>
                    <span className="stt">{record.code}</span>
                    <div>
                      <p className="list-fullname">{record.name}</p>
                      <p className="list-age">{record.age} Tu???i</p>
                    </div>
                  </li>
                ))}
              </ul>
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
)(VisualizeShop);
