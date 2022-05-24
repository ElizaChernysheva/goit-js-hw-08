import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);


const saveTimeToLocalStorage = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
      } catch (error) {
        console.error("Set state error: ", error.message);
      }
}

const getTimeFromLocalStorage = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
      } catch (error) {
        console.error("Get state error: ", error.message);
      }
}
const initialTime = getTimeFromLocalStorage("videoplayer-current-time");

player.setCurrentTime(initialTime);

const getTimeUpdate = function(event) {
    saveTimeToLocalStorage("videoplayer-current-time", event.seconds);
}
const throttledFunction = throttle(getTimeUpdate, 1000 * 60);
player.on('timeupdate', throttledFunction);


