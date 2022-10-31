import React, { useState, useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const savedCallback = useRef();
  const firstRenderRef = useRef(true)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
    if (firstRenderRef.current) firstRenderRef.current = false
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (!firstRenderRef.curent) tick()
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}