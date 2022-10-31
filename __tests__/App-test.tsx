import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer'; // must be required after react-native
import App from '@src/app2';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(true), 10));
});

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
