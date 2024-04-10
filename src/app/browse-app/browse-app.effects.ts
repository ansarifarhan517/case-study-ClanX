import { call, takeLatest } from 'redux-saga/effects'
import { IFetchWeather } from './browse-app.action'
import { get } from '@api'

function* fetchWeather ()  {
  // eslint-disable-next-line
  const { data } = yield(call<any>(get,'url'))
  console.log(data)

}

// -------------------->Watchers 
export function* watchFetchWeather ()  {
  yield takeLatest<IFetchWeather>('@@beatListView/FETCH_STRUCTURE', fetchWeather)
}
