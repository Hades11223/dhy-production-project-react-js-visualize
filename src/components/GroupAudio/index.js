import React, { useEffect, useState, useRef } from 'react';
import profileProvider from '@data-access/profile-provider';
import { playSound } from '@utils/sound-utils';
import useInterval from '@hook/useInterval';
import actionAudio from "@actions/audios";
import {connect} from "react-redux";

 function Index(props) {
  const [state, _setState] = useState({
    data: {},
    index: -1,
    listAudio: [],
  });
  const setState = (data = {}) => {
    _setState((prevState) => {
      return { ...prevState, ...data };
    });
  };
  const refState = useRef(new Date());
  useInterval(() => {
    if (new Date() - refState.current > 10000) getAudio(props.group, props.repeat, props.speaker);
  }, 10000);
  const getAudio = (group, repeat, speaker) => {
    refState.current = new Date();
    profileProvider
      .getAudio(group, repeat, speaker)
      .then((s) => {
        if (s.code === 0 && s.data && s.data.length) {
          setState({
            listAudio: s.data,
            index: 0,
          });
        } else {
          setTimeout(
            (currentGroup, currentRepeat, currentSpeaker) => {
              getAudio(currentGroup, currentRepeat, currentSpeaker);
            },
            3000,
            group,
            repeat,
            speaker,
          );
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    getAudio(props.group, props.repeat, props.speaker);
  }, [props.group]);

  useEffect(() => {
    if (state.index >= 0) {
      try {
        let audio = state.listAudio[state.index].audio
        const x = `/api/audio/${audio}`;
        playSound(x, onEnded);
        props.updateData({audio : audio});
      } catch (error) {
        console.error('Playsound error', error);
      }
    }
  }, [state.index]);

  const onEnded = () => {
    refState.current = new Date();
    if (state.index < state.listAudio.length - 1) {
      setTimeout(() => {
        setState({ index: state.index + 1 });
      }, 1500);
    } else {
      setState({
        listAudio: [],
        index: -1,
      });
      setTimeout(() => {
        getAudio(props.group, props.repeat, props.speaker);
      }, 3000);
    }
  };

  return <iframe title="audio" style={{ display: 'none' }} />;
}

export default connect(
  null,
   {
    updateData: actionAudio.updateData,
   }
 )(Index);
 