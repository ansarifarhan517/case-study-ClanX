import React, { useEffect } from 'react'
import './style.scss'
import { bemClass } from '@utils'
import LeftPanel, { getFormattedWeatherData } from '@components/LeftPanel'
import RightPanel from '@components/RightPanel'
import { useDispatch } from 'react-redux'

const blk = 'wrapper'

const BrowseApp: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserLocationCity = async () => {
      try {
        // const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        //   navigator.geolocation.getCurrentPosition(resolve, reject)
        // })

        // const response = await get(
        //   `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${'55f6ffac2a0b888d09f4f2a1a6230c45'}`,
        // )

        const { uniqueArray, highlightData } = await getFormattedWeatherData({ q: 'pune',units: 'metric' })
        dispatch({ type: '@@highlight/SET_DATA', payload:highlightData })
        console.log(uniqueArray,'days')
        dispatch({ type:'@@browseApp/SET_WEATHER', payload: uniqueArray })
        // const cityName = weatherData.name
        // dispatch({ type: '@@LeftPanel/SET_CITY', payload: cityName })
      } catch (error) {
        console.error('Error getting user location city:', error)
      }
    }

    fetchUserLocationCity()
  }, [dispatch])

  return (
    <div className={bemClass([blk, ''])}>
      <div className={bemClass([blk, 'main-div'])}>
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  )
}

export default BrowseApp
