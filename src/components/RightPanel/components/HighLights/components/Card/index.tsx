import Text from '@base/text'
import { bemClass } from '@utils'
import React from 'react'
import './style.scss'

const blk = 'highlight-card'

interface ICardProps {
    title: string;
    className?: string;
    children: React.ReactNode;
}

const Card:React.FC<ICardProps> = ({ title, children, className }) => (
  <div className={bemClass([blk,{},className])}>
    <Text
      tag={'span'}
      typography="s"
      color="gray-light"
      align="left">{title}</Text>
    {children}
  </div>
)

export default Card