/**
 * @format
 */

import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import App from '../src/App';



it('renders correctly', () => {
  renderer.create(<App />);
});
