import greetings from './greetings';

const myBadFunction = (name = 'Cesar') => {
    const titleEl = document.querySelector('#greetings-title');
    const greeting = greetings();
    titleEl.textContent = `${greeting} ${name}!`;
};

myBadFunction();
