import React from "react";
import ReactDOM from "react-dom";
import UnityNetworkApp from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UnityNetworkApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
