import donutsImg from '../../assets/images/BreakfastCategory/donut.jpeg'
import frenchToastImg from '../../assets/images/BreakfastCategory/frenchToast.jpeg'
import granolaImg from '../../assets/images/BreakfastCategory/granola.jpeg'
import muffinsImg from '../../assets/images/BreakfastCategory/muffins.jpeg'
import pancakesImg from '../../assets/images/BreakfastCategory/pancakes.jpeg'
import smoothiesImg from '../../assets/images/BreakfastCategory/smoothies.jpeg'
import wafflesImg from '../../assets/images/BreakfastCategory/waffles.jpeg'
import appetizerImg from '../../assets/images/imagesByType/appetizer.jpeg'
import breakfastImg from '../../assets/images/imagesByType/breakfast.jpeg'
import dessertImg from '../../assets/images/imagesByType/dessert.jpeg'
import saladImg from '../../assets/images/imagesByType/salad.jpeg'

export const breakfastCategory = [
  { id: 1, title: 'Donuts', img: donutsImg },
  { id: 2, title: 'French Toast', img: frenchToastImg },
  { id: 3, title: 'Granola', img: granolaImg },
  { id: 4, title: 'Muffins', img: muffinsImg },
  { id: 5, title: 'Pancakes', img: pancakesImg },
  { id: 6, title: 'Smoothies', img: smoothiesImg },
  { id: 7, title: 'Waffles', img: wafflesImg },
]

export const breakfastHeaderInfo =
  'Try these sweet and savory breakfast and brunch favorites that can be made ahead of time or quick and easy to start the morning off right! Casseroles, cinnamon rolls and my grandma`s famous pancakes are always favorites in our home.'
export const saladHeaderInfo =
  'Here are all my favorite side dish salads, perfect for potluck, dessert salads and those easy to make salads for lunch. These salads are delicious and full of flavor!'
export const appetizerHeaderInfo =
  'First impressions are everything and with appetizers being one of the first introductions into the meal you always want it to be the best! From dips to cheeseballs plus everything in-between I have your started recipe for you.'
export const dessersHeaderInfo =
  'Both children and adults love sweets. Sweet our life is brighter, more fun. Everyone knows that sweets cheer up, stimulate the brain and improve memory.'

export const HeaderInfo = ({ category }) => {
  switch (category) {
    case 'breakfast':
      return breakfastHeaderInfo
    case 'salad':
      return saladHeaderInfo
    case 'dessert':
      return dessersHeaderInfo
    case 'appetizer':
      return appetizerHeaderInfo
    default:
      break
  }
}

export const HeaderImage = ({ category }) => {
  switch (category) {
    case 'breakfast':
      return <img src={breakfastImg} alt={category} />
    case 'salad':
      return <img src={saladImg} alt={category} />
    case 'dessert':
      return <img src={dessertImg} alt={category} />
    case 'appetizer':
      return <img src={appetizerImg} alt={category} />
    default:
      break
  }
}
