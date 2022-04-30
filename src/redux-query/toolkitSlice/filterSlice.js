import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    cuisinesItems: [],
    dishTypeItems: [],
    dietaryConcernsItem: [],
    equipmentItems: [],
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
    removeTagItem(state, action) {
      const newTagsCuisines = state.filters.cuisinesItems.filter(
        (el) => el != action.payload
      )
      const newTagsDishType = state.filters.dishTypeItems.filter(
        (el) => el != action.payload
      )
      const newTagsDietaryConcerns = state.filters.dietaryConcernsItem.filter(
        (el) => el != action.payload
      )
      const newTagsEquipment = state.filters.equipmentItems.filter(
        (el) => el != action.payload
      )
      state.filters.cuisinesItems = newTagsCuisines
      state.filters.dishTypeItems = newTagsDishType
      state.filters.dietaryConcernsItem = newTagsDietaryConcerns
      state.filters.equipmentItems = newTagsEquipment
    },
    clearFilters(state) {
      state.filters.cuisinesItems = []
      state.filters.dishTypeItems = []
      state.filters.dietaryConcernsItem = []
      state.filters.equipmentItems = []
    },
  },
})

export default filterSlice.reducer

export const { addItem, removeTagItem, clearFilters } = filterSlice.actions
