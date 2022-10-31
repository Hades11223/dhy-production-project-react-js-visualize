function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: 'AUDIO-UPDATE-DATA',
      data,
    });
  };
}

export default {
  updateData,
};
