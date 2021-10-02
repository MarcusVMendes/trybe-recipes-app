// Tela de receita em progresso: requisitos 47 a 53;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function InProgressDrinks({ match: { params: { id } } }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function requestDrink() {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const response = await fetch(`${url}${id}`);
      const { drinks } = await response.json();

      setData(drinks[0]);
    }
    requestDrink();
  }, [id]);

  const ingredientsArray = [];
  const measureArray = [];
  Object.keys(data).forEach((key) => {
    if (key.includes('strIngredient') && data[key]) {
      ingredientsArray.push(data[key]);
    }
    if (key.includes('strMeasure') && data[key]) {
      measureArray.push(data[key]);
    }
  });

  function renderIngredients(array) {
    return (
      array.map((ingredient, index) => (
        <li key={ ingredient } data-testid={ `${index}-ingredient-step` }>
          { ingredient }
          {' '}
          { measureArray[index] }
        </li>
      ))
    );
  }

  const { idDrink, strDrinkThumb, strDrink, strCategory } = data;
  return (
    <div>
      <div key={ idDrink } className="recipe-in-progress-container">
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{ strDrink }</h2>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <ul>
          {renderIngredients(ingredientsArray)}
        </ul>
        <p data-testid="instructions">Instruções</p>
        <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
      </div>
    </div>
  );
}

InProgressDrinks.propTypes = {
  match: PropTypes.objectOf(PropTypes.number),
}.isRequired;

export default InProgressDrinks;
