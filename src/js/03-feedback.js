import throttle from "lodash.throttle";

const formEl = document.querySelector(".feedback-form");
const btnEl = document.querySelector("button[type='submit']");
const inputEl = document.querySelector("input[type='email']");
const textareaEl = document.querySelector("textarea[name='message']");
let user = {};
const LOCALSTORAGE_KEY = "feedback-form-state";

const getFieldFromLocalStorage = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
      } catch (error) {
        console.error("Get state error: ", error.message);
      }
}

if (getFieldFromLocalStorage(LOCALSTORAGE_KEY)){
    inputEl.value = getFieldFromLocalStorage(LOCALSTORAGE_KEY).email;
    textareaEl.value = getFieldFromLocalStorage(LOCALSTORAGE_KEY).message;
} else { 
    inputEl.value = "";
    textareaEl.value = "";
}

const saveFieldToLocalStorage = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
      } catch (error) {
        console.error("Set state error: ", error.message);
      }
}

const initialSaveData =  throttle(saveFieldToLocalStorage, 500);

const setInputData = (event) => {
    const {
        elements: { email, message },
      } = event.currentTarget;

    if (email.value && message.value){
        user = {
            email: email.value,
            message: message.value,
        };

        initialSaveData(LOCALSTORAGE_KEY,user);
    }
}


formEl.addEventListener("input",setInputData);

const clearData = (event) =>{
    event.preventDefault();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    formEl.reset();
    console.log(user);
}

formEl.addEventListener("submit",clearData);

