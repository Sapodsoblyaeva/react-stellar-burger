import PropTypes from 'prop-types'

export const burgerCardPropType = PropTypes.shape({
  props: PropTypes.object.isRequired,
})

export const menuItemPropType = PropTypes.shape({
  props: PropTypes.object.isRequired,
})

export const titlePropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
})
