import React from 'react'
import './style.scss'
import Card from './components/Card'
import Text from '@base/text'
import { bemClass } from '@utils'
import { useTypedSelector } from '../../../../redux/rootReducers'
import { DateTime } from 'luxon'

const blk = 'highlights'

const Highlights: React.FC = () => {
  // eslint-disable-next-line
  const data: Record<string, any> = useTypedSelector(state => state.highlights.data)

  const sunriseDateTime = data.sunrise ? DateTime.fromSeconds(data.sunrise).setZone(data.zone) : null
  const formattedSunrise = sunriseDateTime ? sunriseDateTime.toFormat('hh:mm a') : ''

  const sunsetDateTime = data.sunset ? DateTime.fromSeconds(data.sunset).setZone(data.zone) : null
  const formattedSunset = sunsetDateTime ? sunsetDateTime.toFormat('hh:mm a') : ''

  return (
    <div className={bemClass([blk])}>
      <Text tag={'label'} fontWeight="semi-bold" typography="xl" className="mb-10">Todays Highlight</Text>
      <div className={bemClass([blk, 'cards-container'])}>
        {/* <Card title="UV Index" ><div>World</div></Card> */}
        <Card title="Wind Satus">
          <div>
            <h1>{data?.speed} <sub>km/h</sub></h1>
            <span>WSW</span>
          </div>
        </Card>
        <Card title="Sunrise & Sunset" className="sunrise-sunsetcontainer">
          <div className="sunrise">
            <div className="upArrow">&uarr;</div>
            <div>
              <h4>{formattedSunrise}</h4>
            </div>
          </div>
          <div className="sunset">
            <div className="downArrow">&darr;</div>
            <div>
              {/* Use formattedSunrise here */}
              <h4>{formattedSunset}</h4>
            </div>
          </div>
        </Card>
        <Card title="Humidity">
          <div>
            <div  className={bemClass([blk, 'humidity'])}>
              <h1>{data.humidity} <sup>%</sup></h1>
              <div className={bemClass([blk, 'slider'])}>
              </div>
            </div>
            <Text tag={'label'} >Normal &#129305;</Text>
          </div>
        </Card>
        <Card title="Visibility"><div>
          <div>
            <div>
              <h1>{data.feels_like} <sub>Km</sub></h1>
              <Text tag={'label'} >Average &#128528;</Text>
            </div>
          </div>
        </div>
        </Card>
        <Card title="Air Quality">
          <div>
            <div  className={bemClass([blk, 'air-quality'])}>
              <h1>{data.gust} <sup>%</sup></h1>
              <div className={bemClass([blk, 'slider'])}>
              </div>
            </div>
            <Text tag={'label'} >Unhealthy &#128078;</Text>
          </div></Card>
      </div>
    </div>
  )
}

export default Highlights
