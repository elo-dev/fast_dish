import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Col, Empty, Input, Layout, Pagination, Row, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import { onValue, ref, remove } from 'firebase/database'
import { db } from '../../firebase'

import { useAuth } from '../../hooks/useAuth'
import useUpdateSearchParam from '../../hooks/useUpdateSearchParam'

import cn from 'classnames'

import style from './Favourites.module.scss'

const { Title, Text } = Typography

const Favourites = () => {
  const { userAuth } = useAuth()

  const [searchParams] = useSearchParams()
  const updateSearchParams = useUpdateSearchParam()
  const currentPageParams = +searchParams.get('page')

  const [favourites, setFavourites] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(
    currentPageParams ? currentPageParams : 1
  )
  const favouritesPerPage = 5

  useEffect(() => {
    const favouritesRef = ref(db, `user/${userAuth.uid}/favourites`)

    const unsubscribe = onValue(favouritesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const favourites = Object.values(data).map((favourite) => favourite)
        setFavourites(favourites)
      } else {
        setFavourites({})
      }
    })

    return () => unsubscribe()
  }, [])

  const handleDelete = (event, id) => {
    event.preventDefault()

    const favouritesRef = ref(db, `user/${userAuth.uid}/favourites`)

    let key = null

    onValue(favouritesRef, (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((item) => {
          if (item.val().id === id) key = item.key
        })
      }
    })

    remove(ref(db, `user/${userAuth.uid}/favourites/${key}`))
  }

  const filteredFavourites = favourites.filter(({ title }) => {
    return title.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const lastIndex = currentPage * favouritesPerPage
  const firstIndex = lastIndex - favouritesPerPage
  const currentFavourites = filteredFavourites.slice(firstIndex, lastIndex)

  const onChangePage = (currentPage) => {
    setCurrentPage(currentPage)
    updateSearchParams('page', currentPage)
  }

  return (
    <Layout className={style.favourites}>
      <Row gutter={[16, 16]} justify="center">
        {!favourites.length && <Empty description={'No saved recipes'} />}
      </Row>
      {favourites.length !== 0 && (
        <Input
          className={style.search}
          placeholder="Search for a saved recipe"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      <Row gutter={[0, 16]}>
        {currentFavourites.map(({ id, dishTypes, image, title }) => (
          <Col span={24} key={id}>
            <Link to={`/recipe/${id}`}>
              <div className={cn(style.favourites__recipe, style.recipe)}>
                <img className={style.recipe__image} src={image} alt={title} />
                <div>
                  <Title className={style.recipe__title}>{title}</Title>
                  {dishTypes.slice(0, 3).map((type, index) => (
                    <Text className={style.recipe__types} key={index}>
                      {type}
                    </Text>
                  ))}
                </div>
                <DeleteOutlined
                  className={style.recipe__delete}
                  onClick={(e) => handleDelete(e, id)}
                />
              </div>
            </Link>
          </Col>
        ))}
      </Row>
      {filteredFavourites.length >= 5 && (
        <Pagination
          defaultCurrent={1}
          pageSize={favouritesPerPage}
          current={currentPage}
          total={filteredFavourites.length}
          showLessItems
          showSizeChanger={false}
          className={style.pagination}
          onChange={onChangePage}
        />
      )}
    </Layout>
  )
}

export default Favourites
