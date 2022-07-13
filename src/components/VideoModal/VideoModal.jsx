import { Modal } from 'antd'
import ReactPlayer from 'react-player/lazy'
import { useNavigate, useParams, useLocation } from 'react-router'

import style from './VideoModal.module.scss'

const VideoModal = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  return (
    <Modal
      width={800}
      visible={Boolean(id)}
      onCancel={() => navigate(`/video${location.search.toString()}`)}
      footer={false}
    >
      <div className={style.player__wrapper}>
        <ReactPlayer
          playing={Boolean(id)}
          volume={0.1}
          width="100%"
          url={`https://www.youtube.com/watch?v=${id}`}
          controls
        />
        <div className={style.player__controls}></div>
      </div>
    </Modal>
  )
}

export default VideoModal
