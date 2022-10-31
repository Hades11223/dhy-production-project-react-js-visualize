import roomProvider from '@data-access/room-provider';
function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: 'ROOM-UPDATE-DATA',
      data,
    });
  };
}

function getRoom(url, roomId, isInvoiceDoor) {
  return (dispatch, getState) => {
    roomProvider
      .getInvoiceDoorRoomById(url, roomId, isInvoiceDoor)
      .then((s) => {
        dispatch(
          updateData({
            ["room_"+roomId]: s,
          })
        );
      })
      .catch(() => {
        dispatch(
          updateData({
            rooms: [],
          })
        );
      });
  };
}

function getListInvoiceDoorRoom(url) {
  return (dispatch) => {
    roomProvider
      .getListInvoiceDoorRoom(url)
      .then((s) => {
        dispatch(
          updateData({
            listRoom: s.data || [],
          })
        );
      })
      .catch(() => {
        dispatch(
          updateData({
            rooms: [],
          })
        );
      });
  };
}
export default {
  getRoom,
  getListInvoiceDoorRoom,
};
