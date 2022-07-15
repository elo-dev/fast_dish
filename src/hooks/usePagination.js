import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import useUpdateSearchParam from '../hooks/useUpdateSearchParam'

const usePagination = ({ setItemPerPage, itemPerPage }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPageParams = +searchParams.get('page')

  const updateSearchParams = useUpdateSearchParam()
  const [currentPage, setCurrentPage] = useState(1)
  const [offsetPage, setOffsetPage] = useState(0)

  useEffect(() => {
    if (currentPage > 1) {
      updateSearchParams('page', currentPage)
    }
  }, [currentPage])

  useEffect(() => {
    if (currentPageParams) {
      setOffsetPage(currentPageParams * itemPerPage - itemPerPage)
    }
  }, [])

  const changePage = (page, pageSize) => {
    if (page === 1) {
      searchParams.delete('page')
      setSearchParams(searchParams)
    }
    setCurrentPage(page)
    setOffsetPage(page * pageSize - pageSize)
    setItemPerPage(pageSize)
  }

  return {
    currentPage,
    offsetPage,
    currentPageParams,
    changePage,
  }
}

export default usePagination
