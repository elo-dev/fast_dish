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
      const newTagsIncludeIngridient = state.filters.includeIngridient.filter(
        (el) => el != action.payload
      )
      const newTagsExcludeIngridient = state.filters.excludeIngridient.filter(
        (el) => el != action.payload
      )
      state.filters.cuisinesItems = newTagsCuisines
      state.filters.dishTypeItems = newTagsDishType
      state.filters.dietaryConcernsItem = newTagsDietaryConcerns
      state.filters.equipmentItems = newTagsEquipment
      state.filters.includeIngridient = newTagsIncludeIngridient
      state.filters.excludeIngridient = newTagsExcludeIngridient
    },
    clearFilters(state) {
      state.filters.cuisinesItems = []
      state.filters.dishTypeItems = []
      state.filters.dietaryConcernsItem = []
      state.filters.equipmentItems = []
      state.filters.includeIngridient = []
      state.filters.excludeIngridient = []
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
