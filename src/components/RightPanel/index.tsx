import { bemClass } from '@utils'
import React from 'react'
import './style.scss'
import Header from './components/Header'
import Card from './components/Card'
import Highlights from './components/HighLights'
import { useTypedSelector } from '../../redux/rootReducers'
const blk = 'right-panel'

const RightPanel: React.FC = () => {

  const weatherdata = useTypedSelector(state => state.browseApp.weatherData)
  console.log(weatherdata,'weatherdata')

  return (

    <div className={bemClass([blk])}>
      <Header />
      <div className={bemClass([blk, 'week-card-container'])}>
        {
          weatherdata.length > 0 && weatherdata.map((cardData: { time: string, icon:string, degree:string  }) => <Card
            time={cardData.time}
            icon={cardData.icon}
            degree={cardData.degree}
          />)
        }
      </div>
      <Highlights/>
    </div>
  )}

export default RightPanel