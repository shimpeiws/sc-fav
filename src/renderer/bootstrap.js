import React from 'react';
import ReactDom from 'react-dom';
import {Main} from './components/main';

ReactDom.render(
    React.createElement(Main),
    document.getElementById('app')
);
