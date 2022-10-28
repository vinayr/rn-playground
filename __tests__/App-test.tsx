import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer'; // must be required after react-native
import App from '@src/app2';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

it('renders correctly', async () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
  await sleep(10);
});
