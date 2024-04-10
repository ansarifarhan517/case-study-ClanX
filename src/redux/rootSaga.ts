import { watchFetchWeather } from '../app/browse-app/browse-app.effects'
import { all, spawn } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    spawn(watchFetchWeather),
  ])
}
