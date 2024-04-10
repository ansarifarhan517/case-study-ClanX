import { bemClass } from '@utils'
import { DateTime } from 'luxon'
import React, { useCallback, useState } from 'react'
import './style.scss'
import { useDispatch } from 'react-redux'
// import useDebounce from '@utils/useDebounce'
import { get } from '@api'
import { useTypedSelector } from '../../redux/rootReducers'
import { iconUrlFromCode } from '@components/RightPanel/components/Card'
// @ts-expect-error //will fix later
import CityImage from '@assets/city.jpg'

const blk = 'left-panel'
// eslint-disable-next-line 
type IInterfaceList = Record<string, any>;
const LeftPanel = () => {
  const dispatch = useDispatch()
  const degree = useTypedSelector((state) => state.header.degree)
  const [searchTerm, setSearchTerm] = useState<string>('')
  // const debouncedValue = useDebounce(searchTerm, 300)
  const weatherData = useTypedSelector((state) => state.browseApp.weatherData)
  const highlightData = useTypedSelector((state) => state.highlights.data)


  const currentDate = DateTime.local().toFormat('ccc')
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const currentDayIndex = days.indexOf(currentDate)

  let filteredWeatherData = []

  let nextDayIndex = (currentDayIndex + 1) % 7
  while (nextDayIndex !== currentDayIndex) {
    // eslint-disable-next-line 
    const nextDayData = weatherData && weatherData.length > 0 && weatherData.find((data: any) => data.time === days[nextDayIndex])
    if (nextDayData) {
      filteredWeatherData.push(nextDayData)
      break
    }
    nextDayIndex = (nextDayIndex + 1) % 7
  }

  if (filteredWeatherData.length === 0) {
    // @ts-expect-error will fix later
    filteredWeatherData = [...weatherData]
  }

  console.log(filteredWeatherData, 'left')


  // useEffect(() => {
  //   if (debouncedValue) {
  //     (async function () {
  //       try {
  //         const { highlightData, uniqueArray } = await getFormattedWeatherData({ q: debouncedValue, units: degree })
  //         dispatch({ type: '@@highlight/SET_DATA', payload: highlightData })
  //         dispatch({ type: '@@browseApp/SET_WEATHER', payload: uniqueArray })
  //       } catch (error) {
  //         console.error('API request failed:', error)
  //         alert('Invalid city name.')
  //       }
  //     })()
  //   }
  //   dispatch({ type: '@@LeftPanel/SET_CITY', payload: debouncedValue })
  // }, [debouncedValue])

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.currentTarget.value)
    },
    [],
  )

  const onclear = useCallback(() => {
    setSearchTerm('')
  }, [])

  const searchHandler = useCallback(
    () => {
      (async function(){
        const { highlightData, uniqueArray } = await getFormattedWeatherData({ q: searchTerm, units: degree })
           dispatch({ type: '@@highlight/SET_DATA', payload: highlightData })
           dispatch({ type: '@@browseApp/SET_WEATHER', payload: uniqueArray })
      })()
    },
    [searchTerm, degree],
  )



  return (
    <div className={bemClass([blk])}>
      <div className={bemClass([blk, 'search-container'])}>
        <svg onClick={searchHandler} viewBox="0 0 24 24" width="23" height="21" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input className={bemClass([blk, 'input'])} type="text" placeholder=" Enter Places" onChange={onChangeHandler} value={searchTerm} />
        <div className={bemClass([blk, 'clear'])} onClick={onclear}>
          &#x2715;
        </div>
      </div>

      <div className="weather-data">
        {filteredWeatherData.length > 0 && filteredWeatherData.map(({ time, icon, degree }) => (
          <div key={time} className="weather-day">
            <img src={iconUrlFromCode(icon)} alt="" style={{ height: '210px', width: '200px' }} />
            <h1>
              {degree}
              <sup>&#xb0; C</sup>
            </h1>
            <h3 className="mb-10">{time}, 16:00</h3>
            <hr />
            <label className="icon-detais">
              <span><img src={iconUrlFromCode(icon)} alt="" /></span>
              <p>{highlightData?.details}</p>
            </label>
            <label className="icon-detais">
              <span><img src={'https://openweathermap.org/img/wn/10d@2x.png'} alt="" /></span>
              <p>Rain - 30%</p>
            </label>

            <div className="city-image">
              <img src={CityImage} alt="city" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
// Utils Func

const API_KEY = '4173ba494f7f80ca17e5762e0d25760b'
// const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const getWeatherData = async (infoType: string, searchParams: { q?: string, units: string, lat?: number, lon?: number, exclude?: string }) => {

  try {
    const url = `/${infoType}`
    const queryParams = { ...searchParams, appid: API_KEY }

    const response = await get(url, queryParams)

    if (!response?.data) {
      throw new Error('Failed to fetch data')
    }

    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const formatCurrentWeather = (data: IInterfaceList) => {
  const {
    coord: { lat, lon },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    main: { temp, feels_like, temp_max, temp_min, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed, gust },
    visibility,
  } = data

  const { main: details, icon } = weather[0]
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    dt,
    country,
    sunset,
    sunrise,
    details,
    icon,
    speed,
    visibility,
    gust,
  }
}

const formatForcastWeather = (data: IInterfaceList) => {
  let { list, city } = data
  console.log(data)
  list = list.map((l: IInterfaceList) => ({
    time: DateTime.fromSeconds(l.dt).setZone(city.timezone).toFormat('ccc'),
    icon: l.weather[0].icon,
    degree: l.main.temp,
  }))


  return { list, ...{ zone: city.timezone } }
}

export const getFormattedWeatherData = async (searchParams: { q: string, units: string }) => {
  try {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)
    console.log(formattedCurrentWeather, 'farhan')
    const { lat, lon } = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('forecast', {
      lat,
      lon,
      exclude: 'current, minutely, alerts',
      units: searchParams.units,
    }).then(formatForcastWeather)
    // @ts-expect-error //will fix later
    const data = [...formattedForecastWeather.list, ...formattedCurrentWeather]
    const uniqueTimes = new Set()

    // Filter out duplicate objects based on the unique value of the time property
    const uniqueArray = data.filter(obj => {
      if (!uniqueTimes.has(obj.time)) {
        uniqueTimes.add(obj.time)
        return true
      }
      return false
    })
    console.log({ ...formattedForecastWeather, ...formattedCurrentWeather })
    console.log(uniqueArray, 'uniqueArray')
    return { uniqueArray, highlightData: { ...formattedForecastWeather, ...formattedCurrentWeather } }
  } catch (error) {
    console.error('API request failed:', error)
    alert('InValid City name.')
    throw error
  }
}


export default LeftPanel
