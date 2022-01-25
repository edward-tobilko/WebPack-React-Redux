import React from 'react';
import './index.less';
import { render } from 'react-dom';
import App from './components/App.jsx';
import { store } from './reducers/store';
import { Provider } from 'react-redux';


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') // помещаем наши комп. в контейнер id = root который мы создали в index.html;
);