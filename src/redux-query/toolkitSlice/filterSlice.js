import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    cuisinesItems: [],
    dishTypeItems: [],
    dietaryConcernsItem: [],
    equipmentItems: [],
    includeIngridient: [],
    excludeIngridient: [],
  },
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addItem(state, action) {
      const { filterName, val: value } = action.payload
      if (filterName === 'cuisine') {
        state.filters.cuisinesItems = value
      }
      if (filterName === 'dish type') {
        state.filters.dishTypeItems = value
      }
      if (filterName === 'dietary concerns') {
        state.filters.dietaryConcernsItem = value
      }
      if (filterName === 'equipment') {
        state.filters.equipmentItems = value
      }
    },
    includeIngridient(state, action) {
      state.filters.includeIngridient.push(action.payload)
    },
    excludeIngridient(state, action) {
      state.filters.excludeIngridient.push(action.payload)
    },
    removeTagItem(state, action) {
      for (const key in state.filters) {
        state.filters[key] = state.filters[key].filter(
          (el) => el != action.payload
        )
      }
    },
    clearFilters(state) {
      for (const key in state.filters) {
        state.filters[key] = []
      }
    },
  },
})

export default filterSlice.reducer

export const {
  addItem,
  includeIngridient,
  excludeIngridient,
  removeTagItem,
  clearFilters,
} = filterSlice.actions
