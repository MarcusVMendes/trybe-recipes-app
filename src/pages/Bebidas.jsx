// Tela principal de receitas: requisitos 25 a 32;
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { drinkRequest } from '../services/data';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import { setLoadDrinks as setLoadDrinksAction } from '../Redux/actions';

function Bebidas({ search, radioButton, searchInput, setLoadDrinks }) {
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    const initialRequest = {
      '/bebidas': async () => {
        const { drinks } = await drinkRequest('search.php?s');
        setLoadDrinks(drinks);
      },
    };
    initialRequest[pathname]();
  }, [pathname, setLoadDrinks]);

  /*
  Object Literals realizado por sugestão do Gabs para resolver o problema de complexidade do código gerado
  pela dupla verificação de parametros.

  https://blog.rocketseat.com.br/substituindo-a-instrucao-switch-por-object-literal/
  */
  async function handleSubmitButton() {
    const requestApi = {
      '/bebidas': {
        ingredient: async (input) => {
          const { drinks } = await drinkRequest(`filter.php?i=${input}`);
          setLoadDrinks(drinks);
        },
        name: async (input) => {
          const { drinks } = await drinkRequest(`search.php?s=${input}`);
          setLoadDrinks(drinks);
        },
        'first-letter': async (input) => {
          const { drinks } = drinkRequest(`search.php?f=${input}`);
          if (input.length === 1) {
            setLoadDrinks(await drinks);
          } else {
            global.alert('Sua busca deve conter somente 1 (um) caracter');
          }
        },
      },
    };
    requestApi[pathname][radioButton](searchInput);
  }

  return (
    <div>
      <Header setTitle="Bebidas" />

      {search === true
        ? <SearchBar handleSubmitButton={ handleSubmitButton } />
        : null}
      <CardList />

      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  radioButton: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
  searchInput: PropTypes.string.isRequired,
  setLoadDrinks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  radioButton: state.radioButton,
  searchInput: state.searchInput,
  drinks: state.drinks,
  foods: state.foods,
});

const mapDispatchToProps = (dispatch) => ({
  // setLoadFoods: (payload) => dispatch(setLoadFoodsAction(payload)),
  setLoadDrinks: (payload) => dispatch(setLoadDrinksAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bebidas);
