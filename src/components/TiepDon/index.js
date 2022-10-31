import React, { useEffect } from 'react';
import { Main } from './styled';
import { connect, useSelector } from 'react-redux';
import { formatName } from '@utils/common-utils';
import actionRoom from '@actions/room';
const TiepDon = ({ roomId, url, workwait: { wait = [] } = {}, getRoom, colWidth, rooms, audio }) => {
  const room = useSelector((state) => state.room['room_' + roomId]) || {};
  useEffect(() => {
    let hisURL = url || '';
    if (hisURL[hisURL.length - 1] === '/') {
      hisURL = hisURL.slice(0, hisURL.length - 1);
    }

    if (roomId) getRoom(hisURL, roomId);
  }, []);
  console.log("audio", audio)
  return (
    <Main>
      <div className={colWidth < 40 ? 'container-header' : 'container-header header-block-2'}>
        {(wait[0] && wait[0].terminal.toUpperCase()) || 'QUẦY TIẾP ĐÓN'}{' '}
      </div>
      <div className="container-content">
        <div className="waiting">
          <div className="status">{'ĐANG CHỜ'}</div>
          <div className="waiting">
            <div className={colWidth < 40 ? 'content' : 'content block-2'}>
              <ul>
                {wait.map((patient, index) => {
                  if (index > 1) return null;
                  console.log("audio", audio)
                  console.log("patient?.audio", patient?.audio)
                  return (
                    <li key={patient.id}>
                      <div>
                        <div className={`stt ${patient?.audio === audio ? "audio" : ""}`}>{patient.code}</div>
                        <div className={`fullname ${patient?.audio === audio ? "audio" : ""}`}>
                          {formatName(patient.name)}
                          <br/>
                          ({patient.age} tuổi)
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default connect(  (state) => ({
  audio: state.audio.audio || [],
}), {
  getRoom: actionRoom.getRoom,
})(TiepDon);
