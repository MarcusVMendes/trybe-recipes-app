// Tela de receita em progresso: requisitos 47 a 53;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function InProgressDrinks({ match: { params: { id } } }) {
  const [data, setData] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  useEffect(() => {
    async function requestDrink() {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const response = await fetch(`${url}${id}`);
      const { drinks } = await response.json();

      setData(drinks);

      const objeto = [];
      const entries = Object.entries(drinks[0])
        .filter((e) => e[0].includes('strIngredient'));
      entries.forEach((entrie) => {
        if (entrie[0].includes('strIngredient') && entrie[1] !== null && entrie[1] !== '') {
          objeto.push(entrie[1]);
        }
      });
      setIngredientList(objeto);
      // console.log(entries)
      console.log(drinks)
    }
    requestDrink();
  }, [id]);

  return (
    <div>
      {data.map((drink) => (
        <div key={ drink.idDrink } className="recipe-in-progress-container">
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{drink.strDrink}</h2>
          <button type="button" data-testid="share-btn">Compartilhar</button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
          <h3 data-testid="recipe-category">{drink.strCategory}</h3>
          {/* <p data-testid={ `${id}-ingredient-step` }>{ drink.strIngredient}</p> */}
          <ul>
            {ingredientList.map((ingredient) => (
              <li key={ ingredient }>{ingredient}</li>
            ))}
          </ul>
          <p data-testid="instructions">Instruções</p>
          <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
        </div>
      ))}
    </div>
  );
}

// InProgressDrinks.propType = {
//   match: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//   }).isRequired,
// };

InProgressDrinks.propTypes = {
  match: PropTypes.objectOf(PropTypes.number),
}.isRequired;

export default InProgressDrinks;

/*
Lembrates:
mudar o p do ingrediente para uma li se for o caso.
checar qual é o index dinamico que o ingrediente espera.
atentar para a explicação sobre o tamanho do atributo ingrediente no readme
*/
