import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function InProgressFoods({ match: { params: { id } } }) {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function requestFoods() {
      const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const response = await fetch(`${url}${id}`);
      const { meals } = await response.json();

      setData(meals[0]);
    }
    requestFoods();
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
          <input type="checkbox" />
          { ingredient }
          {' '}
          { measureArray[index] }
        </li>
      ))
    );
  }

  const { idMeal, strMealThumb, strMeal, strCategory } = data;
  return (
    <div>
      <div key={ idMeal } className="recipe-in-progress-container">
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{ strMeal }</h2>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <ul>
          {renderIngredients(ingredientsArray)}
        </ul>
        <p data-testid="instructions">Instruções</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}

InProgressFoods.propTypes = {
  match: PropTypes.objectOf(PropTypes.number),
}.isRequired;

export default InProgressFoods;
