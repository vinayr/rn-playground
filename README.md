
- Typescript
- ESLint
- React Navigation
- App1
  - Hooks, Redux, Redux-Thunk, Reselect
- App2
  - Hooks, Context

<br/>
<br/>

setup
```bash
git clone https://github.com/vinayr/rn-playground
cd rn-playground
yarn install
cd ios && pod install && cd ..
yarn start
react-native run-android
react-native run-ios # or 'xed -b ios'
```

firebase
```bash
cp /path/to/google-services.json android/app/
cp /path/to/GoogleService-Info.plist ios/
```
release
```bash
# android
npx jetify # if using firebase
cd android
./gradlew bundleRelease     # for aab
./gradlew assembleRelease   # for apk
react-native run-android --variant=release # test on device with release apk
```
