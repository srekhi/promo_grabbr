import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Modal from 'react-modal';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
    Modal.setAppElement(document.body);
    let store;
    if (window.currentUser) {
      const preloadedState = { session: { currentUser: window.currentUser, errors: []} }; 
      store = configureStore(preloadedState);
      window.store = store;
      delete window.currentUser;
    } else {
      store = configureStore();
      window.store = store;
      window.state = store.getState();
      const root = document.getElementById('root');
  }
  ReactDOM.render(<Root store={store} />, root);
});