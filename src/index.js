import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {loadCourses} from './actions/courseActions'


const store = configureStore();
store.dispatch(loadCourses());

render(<Provider store={store}>
        <App/>
      </Provider>,
  document.getElementById('app')
);