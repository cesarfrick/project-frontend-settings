import greetings from './greetings';

const myBadFunction = () => {
    const titleEl = document.querySelector('#greetings-title');
    const greeting = greetings();
    titleEl.textContent = `${greeting} Cesar`;
};

myBadFunction();
