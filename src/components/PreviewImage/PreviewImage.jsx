import { Image, Progress } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import style from '../../Pages/CreateMealPlan/CreateMealPlan.module.scss'

const PreviewImage = ({ uploadedImage, isUploadLoading, percentLoading }) => {
  if (uploadedImage) {
    return (
      <div className={style.preview}>
        <Image
          className={style.preview__image}
          preview={false}
          src={uploadedImage}
        />
        <div className={style.preview__body}>
          <p className={style.text}>
            <UploadOutlined className={style.icon_upload} />
          </p>
          <p className={style.text}>Add photo (upload)</p>
          <p className={style.text}>Drag photos here or click on the icon</p>
        </div>
      </div>
    )
  } else if (isUploadLoading) {
    return <Progress type="circle" percent={percentLoading} />
  }
  return (
    <>
      <p className="ant-upload-text">
        <UploadOutlined />
      </p>
      <p className="ant-upload-text">Add photo (upload)</p>
      <p className="ant-upload-hint">Drag photos here or click on the icon</p>
    </>
  )
}

export default PreviewImage
