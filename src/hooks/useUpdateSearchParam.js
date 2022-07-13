import { useSearchParams } from 'react-router-dom'

const useUpdateSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateSearchParams = (paramKey, newValue) => {
    searchParams.set(paramKey, newValue)
    setSearchParams(searchParams)
  }

  return updateSearchParams
}

export default useUpdateSearchParam
