import actionRoom from '@actions/room';
import GroupAudio from '@components/GroupAudio';
import PaymentShop from '@components/PaymentShop';
import profileProvider from '@data-access/profile-provider';
import useInterval from '@hook/useInterval';
import { DHY, Isofh } from '@svg';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import './style.scss';
const queryString = require('query-string');

const Visualize = ({ getRoom }) => {
  const parsed = queryString.parse(window.location.search);
  const [state, _setState] = useState({
    data: {},
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  useInterval(
    () => {
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
          } catch (error) {}
        })
        .catch((e) => {
          console.error(e.message);
        });
    },
    parsed.timer && parsed.timer != 0 ? parsed.timer : 1000
  );
  const rooms = (parsed.room || '').split(',');
  const colWidth = 100 / Math.round(rooms.length / 2);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="visualize">
      <GroupAudio group={parsed.group} repeat={parsed.repeat} />
      <div className="body-wrapper">
        <div className="header">
          <div>
            <DHY />
          </div>
          <div className="title"> {parsed.invoiceDoor === 'Y' ? 'QUẦY THANH TOÁN NGOẠI TRÚ' : 'KHÁM BỆNH'}</div>
          <div className="logo-isofh">
            <Isofh />
          </div>
        </div>
        <div className="content">
          <Row gutter={[24, 24]}>
            {rooms.length > 0 &&
              rooms.map((room, index) => (
                <Col span={12} key={index}>
                  <PaymentShop
                    roomId={room}
                    workwait={state.data[room]}
                    url={parsed.url}
                    colWidth={colWidth}
                    isInvoiceDoor={parsed.invoiceDoor}
                    getRoom={getRoom}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </div>
  );
};
export default connect(null, { getRoom: actionRoom.getRoom })(Visualize);
