import { useSearchParams } from 'react-router-dom'

const useUpdateSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateSearchParams = (paramKey, newValue) => {
    const isParamExist = searchParams.getAll(paramKey).includes(newValue)

    if (!isParamExist) {
      searchParams.set(paramKey, newValue)
      setSearchParams(searchParams)
    } else {
      const updatedSearchParams = new URLSearchParams(
        [...searchParams].filter(
          ([key, value]) => key !== paramKey || value !== newValue
        )
      )
      setSearchParams(updatedSearchParams)
    }
  }

  return updateSearchParams
}

export default useUpdateSearchParam
