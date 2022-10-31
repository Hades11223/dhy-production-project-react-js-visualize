import React, { useState } from 'react';
import useInterval from '@hook/useInterval';
import profileProvider from '@data-access/profile-provider';
import logoSaintPaul from '@images/logo.png';
import arrowRight from '@images/arrow-right.png';
import logoIsofh from '@images/logo-isofh2.png';
import './index.scss';
import { formatName } from '@utils/common-utils';
const queryString = require('query-string');

const VisualizePatientsWait = () => {
  const parsed = queryString.parse(window.location.search);
  const listCurrentRoom = (parsed.room || '').split(',');
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [state, _setState] = useState({
    data: {},
  });

  useInterval(() => {
    profileProvider
      .getWorkWait(parsed.room)
      .then((s) => {
        try {
          const data = {};
          (listCurrentRoom || []).forEach((item) => {
            data[item] = s.data.find((item2) => item2.room == item.trim()) || {};
          });
          setState({
            data,
          });
        } catch (error) {}
      })
      .catch(() => {});
  }, parsed.timer || 1000);

  return (
    <div className="patient-wait">
      <div className="content-tivi">
        <div className="head-tivi">
          <span className="logo">
            <img src={logoSaintPaul} alt="" />
          </span>
          <span className="icon-soft">
            <img src={arrowRight} alt="" />
          </span>
          <span className="title-tivi" id="title-tive">
            {parsed.roomName || ''}
          </span>
          <span className="logo-isoft">
            <img src={logoIsofh} alt="" />
          </span>
        </div>
        <div id="item-patients">
          {listCurrentRoom.map((item, index) => {
            const currentRoom = state.data[item] || {};
            const workingUser = (Array.isArray(currentRoom.work) && currentRoom.work[0]) || {};
            return (
              <div
                className={`patient-item ${index === listCurrentRoom.length - 1 ? 'border-right-none' : ''}`}
                key={`${workingUser.code}-${index + 1}}`}
              >
                <div className="head-item">
                  <h2 className="title-big">{item}</h2>
                  <p className="small-title">MỜI VÀO KHÁM</p>
                </div>
                <div className="content-item">
                  <p className="number">{workingUser.code}</p>
                  <p className="name">{formatName(workingUser.name)}</p>
                  <p className="age">{workingUser.age && `${workingUser.age} tuổi`}</p>
                  <p className="light-note" style={{ marginTop: 5 }}></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VisualizePatientsWait;
