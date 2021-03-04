import React from 'react'
import PropTypes from 'prop-types'

import brandLogos from './helpers/brandLogos'

import './sadqahbrandstyles.css'

const BrandLogo = ({
  brand,
  bank,
  model,
  type,
}) => {
  if (!brandLogos[brand]) {
    return null
  }
  const classcss ="brandLogo"
  debugger;
  return (
   
    <img
      src={brandLogos[brand]}
      alt={brand}
      className={classcss}
    />
  )
}

BrandLogo.propTypes = {
  brand: PropTypes.string,
  bank: PropTypes.string,
  model: PropTypes.string,
  type: PropTypes.string,
}

BrandLogo.defaultProps = {
  brand: '',
  bank: '',
  model: '',
  type: '',
}

export default BrandLogo
