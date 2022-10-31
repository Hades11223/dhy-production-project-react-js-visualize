import clientUtils from '@utils/client-utils';

export function playSound(url, callback) {
  const audio = document.createElement('video');
  audio.autoplay = true;
  audio.src = `${clientUtils.serverApi}${url}`;
  audio.style.display = 'none';
  audio.onsuspend = () => {};
  audio.onerror = (e) => {
    console.error(e);
    audio.remove(); // Remove when played.
    if (callback) callback();
  };
  audio.onended = (e) => {
    console.error(e);
    audio.remove(); // Remove when played.
    if (callback) callback();
  };
  document.body.appendChild(audio);
}
