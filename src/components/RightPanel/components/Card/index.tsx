import React from 'react'
import './style.scss'
import { bemClass } from '@utils'
import Text from '@base/text'

const blk = 'card'

interface ICardProps {
    time: string,
    icon: string,
    degree: string
}

const Card: React.FC<ICardProps> = ({ time, icon, degree }) => (
  <div className={bemClass([blk])}>
    <Text
      tag="label"
      className={bemClass([blk, 'title'])}
      typography="xxl"
      color="gray-light"
    >
      {time}
    </Text>



    <img src={iconUrlFromCode(icon)} alt="" />
    <div className={bemClass([blk, 'degree'])}>
      <Text
        tag="label"
        className={bemClass([blk, 'deg-light'])}
        typography="s"
        color="gray-dark"
      >
        {degree}
        <sup>&#xb0;</sup>
      </Text> ,
        &nbsp;
      <Text
        tag="label"
        className={bemClass([blk, 'deg-light'])}
        typography="s"
        color="gray-light"
      >
        {+degree}
        <sup>&#xb0;</sup>
      </Text>
    </div>

  </div>
)

export const iconUrlFromCode = (icon: string) => `http://openweathermap.org/img/wn/${icon}@2x.png`
export default Card