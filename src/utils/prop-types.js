import PropTypes from 'prop-types'

export const ingredientPropType = PropTypes.shape({
  //укажите здесь prop-types для ингридиента
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
})

export const constructorPropType = PropTypes.shape({
  //укажите здесь prop-types для ингридиента
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
})
