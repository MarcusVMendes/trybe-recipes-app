import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { drinkRequest, foodRequest } from '../services/data';

function Categories() {
  const MAX_CAT_LENGTH = 4;
  const { location: { pathname } } = useHistory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const initialRequest = {
      '/comidas': async () => {
        const { meals } = await foodRequest('list.php?c=list');
        setCategories(meals);
      },
      '/bebidas': async () => {
        const { drinks } = await drinkRequest('list.php?c=list');
        setCategories(drinks);
      },
    };
    initialRequest[pathname]();
  }, [pathname]);

  return (
    <div>
      Selecione a categoria:
      <div>
        {categories
          .filter((_, index) => index <= MAX_CAT_LENGTH)
          .map(({ strCategory: category }, index) => (
            <button
              data-testid={ `${category}-category-filter` }
              type="submit"
              key={ index }
              id={ index }
            >
              { `${category}` }
            </button>
          ))}
      </div>
    </div>
  );
}

export default Categories;
