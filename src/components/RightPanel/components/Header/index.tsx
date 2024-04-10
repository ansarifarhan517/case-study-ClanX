import React from 'react'
import './style.scss'
import { bemClass } from '@utils'
import { useTypedSelector } from '../../../../redux/rootReducers'
import { useDispatch } from 'react-redux'
import { getFormattedWeatherData } from '../../../LeftPanel/index'

const blk = 'header'

const Header = () => {
  const degree = useTypedSelector((state) => state.header.degree)
  const city = useTypedSelector((state) => state.leftPanel.city)
  const dispatch = useDispatch()
  const onChangeDegreeHandler = (e: React.MouseEvent) => {
    const payload = e.currentTarget.id === 'metric' ? 'metric' : 'imperial'
    dispatch({ type: '@@Header/SET_DEGREE', payload })
    getFormattedWeatherData({ q: city || 'pune' , units: payload })
  }
  return (
    <div className={bemClass([blk])}>
      <div className={bemClass([blk, 'left'])}>
        <span className={bemClass([blk, 'left-today'])}>Today</span>
        <span className={bemClass([blk, 'left-week'])}>Week</span>
      </div>

      <div className={bemClass([blk, 'right'])}>

        <div className={bemClass([blk, 'right-degree-container'])}>
          <span id="metric" className={`${degree === 'metric' ? 'metric-active' : 'metric'}`} onClick={onChangeDegreeHandler}>
            &deg;C
          </span>
          <span id="imperial" className={`${degree === 'imperial' ? 'imperial-active' : 'imperial'}`} onClick={onChangeDegreeHandler}>
            &deg;F
          </span>
        </div>
        <div className={bemClass([blk, 'right-profile'])}>
          <img src={'https://randomuser.me/api/portraits/men/74.jpg'} alt="" style={{ height:'38px',width:'38px' }}/>
        </div>
      </div>
    </div>
  )}

export default Header