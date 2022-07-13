import { Link, useLocation } from 'react-router-dom'
import { Typography } from 'antd'

import { getTimeFromMins } from '../../utils/timeTransform'

import style from './VideoCard.module.scss'

const { Title, Text } = Typography

const VideoCard = ({ title, length, thumbnail, views, youTubeId }) => {
  const location = useLocation()

  return (
    <Link to={`${youTubeId}${location.search.toString()}`}>
      <div className={style.video}>
        <div className={style.video__header}>
          <img src={thumbnail} className={style.video__img} />
          <span className={style.video__length}>{getTimeFromMins(length)}</span>
        </div>
        <div className={style.video__footer}>
          <Title className={style.video__title}>{title}</Title>
          <Text className={style.video__views}>{views} views</Text>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
