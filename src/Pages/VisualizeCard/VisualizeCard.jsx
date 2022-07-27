import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  runTransaction,
} from 'firebase/firestore'

import { Avatar, Card, Col, Empty, Image, Row, Space, Typography } from 'antd'
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons'

import { firestoreDb } from '../../firebase'

import { useAuth } from '../../hooks/useAuth'
import useMediaMatch from '../../hooks/useMediaQuery'

import RequiredAuthModal from '../../components/RequiredAuthModal/RequiredAuthModal'
import Loading from '../../components/Loading/Loading'

import cn from 'classnames'

import style from './VisualizeCard.module.scss'

const { Title } = Typography

const VisualizeCard = () => {
  const [cards, setCards] = useState([])
  const [isModalSignUp, setIsModalSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { userAuth } = useAuth()

  const isSmallMediaMatch = useMediaMatch('(max-width: 992px)')

  useEffect(() => {
    const unsub = onSnapshot(collection(firestoreDb, 'posts'), (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setCards(posts)
      setIsLoading(false)
    })

    return () => unsub()
  }, [])

  const handleDeleteCard = async (postId) => {
    const postDoc = doc(firestoreDb, 'posts', postId)

    await deleteDoc(postDoc)
  }

  const handleLike = async (postId) => {
    if (userAuth) {
      const postsRef = doc(firestoreDb, 'posts', postId)
      await runTransaction(firestoreDb, async (transaction) => {
        const sfDoc = await transaction.get(postsRef)

        if (!sfDoc.exists()) {
          throw 'Document does not exist!'
        }

        if (!sfDoc.data().liked.length) {
          const like = sfDoc.data().likes + 1

          transaction.update(postsRef, {
            liked: arrayUnion(userAuth.uid),
            likes: like,
          })
        }

        sfDoc.data().liked.filter((user) => {
          if (user !== userAuth.uid) {
            const like = sfDoc.data().likes + 1

            transaction.update(postsRef, {
              liked: arrayUnion(userAuth.uid),
              likes: like,
            })
          } else {
            const like = sfDoc.data().likes - 1

            transaction.update(postsRef, {
              liked: arrayRemove(userAuth.uid),
              likes: like,
            })
          }
        })
      })
    } else {
      setIsModalSignUp(true)
    }
  }

  if (isLoading) return <Loading />

  return (
    <>
      <header className={style.header}>
        <Title className={style.title} level={1}>
          Visualize
        </Title>
        {isSmallMediaMatch && (
          <Link className={style.link__create} to="/visualize/create">
            Create a visualization
          </Link>
        )}
      </header>
      {!cards.length && <Empty description="No visualized cards" />}
      <Row gutter={[16, 16]}>
        {cards?.map((item) => (
          <Col xs={24} sm={12} lg={8} xxl={6} key={item.id}>
            <Card
              className={style.card}
              cover={
                <Image
                  alt={item.title}
                  src={item.url}
                  className={style.card__img}
                />
              }
            >
              <Space size="middle">
                <Avatar
                  src={item.author.avatar}
                  className={style.card__avatar}
                />
                <div>
                  <Title level={2} className={style.card__title}>
                    {item.title}
                  </Title>
                  <p>{item.author.name}</p>
                </div>
              </Space>

              <div className={style.card__footer}>
                {userAuth?.uid === item.author.id && (
                  <DeleteOutlined
                    className={style.icon}
                    onClick={() => handleDeleteCard(item.id)}
                  />
                )}
                <div className={style.card__likes}>
                  <HeartOutlined
                    className={cn(style.icon, style.iconLike)}
                    onClick={() => handleLike(item.id)}
                  />
                  <span className={style.likesCounter}>{item.likes}</span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <RequiredAuthModal
        isModalSignUp={isModalSignUp}
        setIsModalSignUp={setIsModalSignUp}
        text="After logging in, you will be able to mark your favorite posts"
        title="Mark your favorites in your account"
      />
    </>
  )
}

export default VisualizeCard
