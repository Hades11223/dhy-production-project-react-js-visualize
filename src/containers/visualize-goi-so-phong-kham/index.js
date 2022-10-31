import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import useInterval from '@hook/useInterval';
import actionRoom from '@actions/room';
import profileProvider from '@data-access/profile-provider';
import { playSound } from '@utils/sound-utils';
import dollarImg from '@images/dollar.png';
import logoImg from '@images/logo.png';
import logoIsofh from '@images/logo-isofh.png';
import frameImg from '@images/frame-img.png';
import GroupAudio from '@components/GroupAudio';
import { capitalizeFirstLetter } from '@utils/common-utils';
import './style.scss';
const queryString = require('query-string');

const VisualizeShop = ({ getRoom }) => {
  const parsed = queryString.parse(window.location.search);
  const [departmentInfo, setCurrentDepartment] = useState({});
  console.log(parsed.roomId) ;
  const room = useSelector((state) => state.room['room_' + parsed.roomId]) || {};
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
    if (parsed.roomId) getRoom(hisURL, parsed.roomId, 'N');
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };
  const currentPatient = (departmentInfo.work || [])[0] || {};
  const waitingPatient = (departmentInfo.wait || []).filter((item, index) => index < 6);
  return (
    <div className="payment-shop">
      <div className="body-wrapper">
        <div className="header">
          <div className="left">
            <div className="img" onClick={handleRefresh} aria-hidden="true">
              <img src={logoImg} alt="" />
            </div>
            <div className="text">
              BỆNH VIỆN ĐA KHOA
              <br />
              <span className="hospital">XANH PÔN</span>
            </div>
          </div>
          <div className="right">
            <div className="text">
              <h1>{room.Department_Name && room.Department_Name.toUpperCase()}</h1>
              <div className="counter-wrapper">
                <img src={dollarImg} alt="" />
                <div className={room.MainUser1FullName || room.SubUser1FullName ? 'room-detail' : ''}>
                  <div className="room-name">{room.Name && room.Name.toUpperCase()}</div>
                  <div className="room-doctor">
                    {room.MainUser1FullName && <span>BS: {capitalizeFirstLetter(decodeURI(room.MainUser1FullName))}</span>}
                    {room.MainUser1FullName && room.SubUser1FullName && <span> - </span>}
                    {room.SubUser1FullName && <span>Điều dưỡng: {capitalizeFirstLetter(decodeURI(room.SubUser1FullName))}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="img">
              <img src={logoIsofh} alt="" />
            </div>
          </div>
        </div>
        {parsed.goiso === 'true' && parsed.goiloaphong === 'false' ? <GroupAudio group={parsed.group} repeat={parsed.repeat} /> : null}
        <div className="content">
          <div className="number-working">
            <h2>MỜI VÀO KHÁM</h2>
            <p className="number">{currentPatient.code}</p>
            <div className="info-patient">
              <p className="fullname">{currentPatient.name}</p>
              <p className="age">{currentPatient.age && `(${currentPatient.age} tuổi)`}</p>
            </div>
          </div>
          <div className="list-call-fail">
            <h2>
              <img src={frameImg} alt=""></img> DANH SÁCH CHỜ KHÁM
            </h2>
            <div className="list-content">
              <ul>
                {waitingPatient.map((record) => (
                  <li key={record.code}>
                    <span className="stt">{record.code}</span>
                    <div>
                      <p className="list-fullname">{record.name}</p>
                      <p className="list-age">{record.age} Tuổi</p>
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
 null,
  {
    getRoom: actionRoom.getRoom,
  }
)(VisualizeShop);
