import { createSelector } from 'reselect'

const selectSubcategoriesAndSearchGroups = state => state.data.categories

export const selectSubcategory = createSelector(
  selectSubcategoriesAndSearchGroups,
  (state, offer) => offer.subcategoryId,
  (categories, subcategoryId) => {
    const { subcategories } = categories[0]
    const subcategory = subcategories.find(subcategory => subcategory.id === subcategoryId)
    return subcategory
  }
)

export const selectSearchGroup = createSelector(
  selectSubcategoriesAndSearchGroups,
  (state, offer) => offer.subcategoryId,
  (categories, subcategoryId) => {
    console.log('categories', categories)
    const { subcategories, searchGroups } = categories[0]
    const subcategory = subcategories.find(subcategory => subcategory.id === subcategoryId)
    const searchGroup = searchGroups.find(
      searchGroup => searchGroup.name === subcategory.searchGroup
    )
    return searchGroup
  }
)
