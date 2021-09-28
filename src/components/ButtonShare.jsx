import React from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import { foodRequest } from '../services/data';

async function buttonCopy(event) {
  global.alert('Link copiado!');
  const { id } = event.target.parentNode;
  const itemFood = await foodRequest(`lookup.php?i=${id}`);
  if (!itemFood.meals) {
    copy(`http://localhost:3000/bebidas/${id}`);
  } else {
    copy(`http://localhost:3000/comidas/${id}`);
  }
}

function ButtonShare(props) {
  const { index } = props;
  return (
    <input
      data-testid={ `${index}-horizontal-share-btn` }
      type="image"
      onClick={ buttonCopy }
      src={ shareIcon }
      alt="shareIcon"
    />
  );
}

ButtonShare.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default ButtonShare;
