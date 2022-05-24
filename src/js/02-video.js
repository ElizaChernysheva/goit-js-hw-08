import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);


const saveFieldToLocalStorage = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
      } catch (error) {
        console.error("Set state error: ", error.message);
      }
}

const getFieldFromLocalStorage = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
      } catch (error) {
        console.error("Get state error: ", error.message);
      }
}
const initialTime = getFieldFromLocalStorage("videoplayer-current-time");

player.setCurrentTime(initialTime);

const getTimeUpdate = function(event) {
  saveFieldToLocalStorage("videoplayer-current-time", event.seconds);
}
const throttledFunction = throttle(getTimeUpdate, 1000);
player.on('timeupdate', throttledFunction);


