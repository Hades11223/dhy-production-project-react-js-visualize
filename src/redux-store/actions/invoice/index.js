import invoiceProvier from '@data-access/invoice-provider';
function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: 'INVOICE-UPDATE-DATA',
      data,
    });
  };
}
function getAllAreas() {
  return (dispatch, getState) => {
    invoiceProvier
      .getAllAreas()
      .then((s) => {
        dispatch(
          updateData({
            areas: s.data,
          })
        );
      })
      .catch(() => {
        dispatch(
          updateData({
            areas: [],
          })
        );
      });
  };
}

export default {
  getAllAreas,
};
