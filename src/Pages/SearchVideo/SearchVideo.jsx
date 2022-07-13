import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams, Outlet } from 'react-router-dom'
import { Col, Input, Row, Empty, Divider, Pagination } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { useGetVideoRecipeQuery } from '../../redux/services/videoRecipe'
import { addItem } from '../../redux/toolkitSlice/filterSlice'

import useUpdateSearchParam from '../../hooks/useUpdateSearchParam'
import useDebounce from '../../hooks/useDebounce'

import { cuisines, dietaryConcerns, dishType } from '../../data/filters'

import Loading from '../../components/Loading/Loading'
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu'
import VideoCard from '../../components/VideoCard/VideoCard'

import style from './SearchVideo.module.scss'

const SearchVideo = () => {
  const dispatch = useDispatch()
  const updateSearchParams = useUpdateSearchParam()

  const [searchParams, setSearchParams] = useSearchParams()

  const cuisineParams = searchParams.getAll('cuisine')
  const dishTypeParams = searchParams.getAll('dish type')
  const dietaryConcernsParams = searchParams.getAll('dietary concerns')
  const searchTermParam = searchParams.get('q')
  const currentPageParams = +searchParams.get('page')

  const [currentPage, setCurrentPage] = useState(1)
  const [offsetPage, setOffsetPage] = useState(0)

  const [searchTerm, setSearchTerm] = useState(
    searchTermParam ? searchTermParam : ''
  )

  const debouncedSearchTerm = useDebounce(searchTerm, 700)

  useEffect(() => {
    if (debouncedSearchTerm) {
      updateSearchParams('q', debouncedSearchTerm)
    } else {
      searchParams.delete('q')
      setSearchParams(searchParams)
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    searchParams.forEach((value, key) => {
      if (!value.length) {
        searchParams.delete(key)
        setSearchParams(searchParams)
      }
    })
  }, [searchParams])

  useEffect(() => {
    if (currentPage > 1) {
      updateSearchParams('page', currentPage)
    }
  }, [currentPage])

  useEffect(() => {
    if (currentPageParams) {
      setOffsetPage(currentPageParams * 12 - 12)
    }
  }, [])

  const changePage = (page, pageSize) => {
    if (page === 1) {
      searchParams.delete('page')
      setSearchParams(searchParams)
    }
    setCurrentPage(page)
    setOffsetPage(page * pageSize - pageSize)
  }

  const { data: video, isFetching } = useGetVideoRecipeQuery({
    query: debouncedSearchTerm,
    type: dishTypeParams.toString(),
    cuisine: cuisineParams.toString(),
    diet: dietaryConcernsParams.toString(),
    offset: offsetPage,
  })

  const arrDropDownMenu = [
    {
      label: 'cuisine',
      menuItems: cuisineParams.join('').split(','),
      menuOptions: cuisines,
    },
    {
      label: 'dish type',
      menuItems: dishTypeParams.join('').split(','),
      menuOptions: dishType,
    },
    {
      label: 'dietary concerns',
      menuItems: dietaryConcernsParams.join('').split(','),
      menuOptions: dietaryConcerns,
    },
  ]

  return (
    <>
      <div className={style.searchVideo}>
        <div className={style.filters}>
          <Row>
            <Input
              size="large"
              placeholder="Enter a request"
              prefix={<SearchOutlined />}
              className={style.filters__input}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Col span={24}>
              <div className={style.filters__wrapper}>
                {arrDropDownMenu.map(
                  ({ label, menuItems, menuOptions }, index) => (
                    <DropDownMenu
                      key={index}
                      label={label}
                      menuItems={menuItems}
                      setList={(val) =>
                        dispatch(addItem({ filterName: label, val }))
                      }
                      setSearchParams={(val) => updateSearchParams(label, val)}
                      menuOptions={menuOptions}
                    />
                  )
                )}
              </div>
            </Col>
          </Row>
          <Divider className={style.divider} />
        </div>
        {isFetching ? (
          <Loading />
        ) : video?.videos.length ? (
          <Row gutter={[24, 24]}>
            {video.videos.map(
              ({ length, title, thumbnail, views, youTubeId }) => (
                <Col span={6} key={youTubeId}>
                  <VideoCard
                    length={length}
                    title={title}
                    youTubeId={youTubeId}
                    thumbnail={thumbnail}
                    views={views}
                  />
                </Col>
              )
            )}
            <Col span={24}>
              <div className={style.pagination}>
                <Pagination
                  current={currentPageParams ? currentPageParams : currentPage}
                  pageSize={12}
                  onChange={changePage}
                  total={video.totalResults}
                  showSizeChanger={false}
                />
              </div>
            </Col>
          </Row>
        ) : (
          <div className={style.empty}>
            <Empty />
          </div>
        )}
        <Outlet />
      </div>
    </>
  )
}

export default SearchVideo
