import actionRoom from '@actions/room';
import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { PaymentWrapper } from './styled.js';
import { formatNumber } from '@utils/common-utils';
const PaymentShop = ({ roomId, url, workwait: { work = [], wait = [] } = {}, getRoom, colWidth, isInvoiceDoor }) => {
  const room = useSelector((state) => state.room['room_' + roomId]) || {};
  useEffect(() => {
    let hisURL = url || '';
    if (hisURL[hisURL.length - 1] === '/') {
      hisURL = hisURL.slice(0, hisURL.length - 1);
    }

    if (roomId) getRoom(hisURL, roomId, isInvoiceDoor);
  }, []);

  const workingUser = work[0] || {};

  return (
    <PaymentWrapper>
      <div className="title">
        <div className="left-title">{roomId}</div>
        <div className="right-title">{workingUser.code && formatNumber(workingUser.code)}</div>
      </div>
      <div className="name">{`${workingUser.name || ''} ${workingUser.age ? `(${workingUser.age} TUỔI)` : ''} `}</div>
    </PaymentWrapper>
  );
};

export default connect(null, {
  getRoom: actionRoom.getRoom,
})(PaymentShop);
