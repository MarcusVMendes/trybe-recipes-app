// Tela principal de receitas: requisitos 25 a 32;
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { foodRequest } from '../services/data';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import handleSubmitFoods from '../helper/helperFunctionsFoods';
import { setLoadFoods as setLoadFoodsAction } from '../Redux/actions';
import Categories from '../components/Categories';

function FoodsPage({ search, setLoadFoods, radioButton, searchInput, foodsIngredients }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (foodsIngredients.length !== 0) {
      setLoadFoods(foodsIngredients);
    } else {
      const initialRequest = {
        '/comidas': async () => {
          const { meals } = await foodRequest('search.php?s');
          setLoadFoods(meals);
        },
      };
      initialRequest[pathname]();
    }
  }, [pathname, setLoadFoods, foodsIngredients]);

  /*
  Object Literals realizado por sugestão do Gabs para resolver o problema de complexidade do código gerado
  pela dupla verificação de parametros.

  https://blog.rocketseat.com.br/substituindo-a-instrucao-switch-por-object-literal/
  */

  return (
    <div>
      <Header setTitle="Comidas" />

      {search === true ? <SearchBar
        handleSubmitButton={ () => handleSubmitFoods(
          searchInput, setLoadFoods, radioButton, history,
        ) }
      />
        : null}
      <Categories />
      <CardList />

      <Footer />
    </div>
  );
}

FoodsPage.propTypes = {
  radioButton: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
  setLoadFoods: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  foodsIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  radioButton: state.radioButton,
  searchInput: state.searchInput,
  drinks: state.drinks,
  foods: state.foods,
  foodsIngredients: state.loadFoodsIngredients,
});

const mapDispatchToProps = (dispatch) => ({
  setLoadFoods: (payload) => dispatch(setLoadFoodsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodsPage);
