import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

function CardList({ object: { meals, drinks } }) {
  const MAX_CARD_LENGTH = 11;
  return (
    <div>
      {(meals) ? meals
        .filter((_, index) => index <= MAX_CARD_LENGTH)
        .map((food, index) => (
          <Card
            key={ index }
            id={ index }
            image={ food.strMealThumb }
            name={ food.strMeal }
          />
        )) : null}
      {(drinks) ? drinks
        .filter((_, index) => index <= MAX_CARD_LENGTH)
        .map((drink, index) => (
          <Card
            key={ index }
            id={ index }
            image={ drink.strDrinkThumb }
            name={ drink.strDrink }
          />
        )) : null}

    </div>
  );
}

CardList.propTypes = {
  object: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default CardList;
