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
import { setLoadFoods as setLoadFoodsAction,
  setLoadDrinks as setLoadDrinksAction } from '../Redux/actions';

function Home({ search, radioButton, searchInput, setLoadFoods }) {
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    const initialRequest = {
      '/comidas': async () => {
        const { meals } = await foodRequest('search.php?s');
        setLoadFoods(meals);
      },
    };
    initialRequest[pathname]();
  }, [pathname, setLoadFoods]);

  /*
  Object Literals realizado por sugestão do Gabs para resolver o problema de complexidade do código gerado
  pela dupla verificação de parametros.

  https://blog.rocketseat.com.br/substituindo-a-instrucao-switch-por-object-literal/
  */

  async function handleSubmitButton() {
    const requestApi = {
      '/comidas': {
        ingredient: async (input) => {
          const { meals } = await foodRequest(`filter.php?i=${input}`);
          setLoadFoods(meals);
        },
        name: async (input) => {
          const { meals } = await foodRequest(`search.php?s=${input}`);
          setLoadFoods(meals);
        },
        'first-letter': async (input) => {
          if (input.length === 1) {
            const { meals } = foodRequest(`search.php?f=${input}`);
            setLoadFoods(await meals);
          } else {
            global.alert('Sua busca deve conter somente 1 (um) caracter');
            console.log('2 letras');
          }
        },
      },
    };
    requestApi[pathname][radioButton](searchInput);
  }

  return (
    <div>
      <Header setTitle="Comidas" />

      {search === true
        ? <SearchBar handleSubmitButton={ handleSubmitButton } />
        : null}
      <CardList />

      <Footer />
    </div>
  );
}

Home.propTypes = {
  radioButton: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
  searchInput: PropTypes.string.isRequired,
  setLoadFoods: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  radioButton: state.radioButton,
  searchInput: state.searchInput,
  drinks: state.drinks,
  foods: state.foods,
});

const mapDispatchToProps = (dispatch) => ({
  setLoadFoods: (payload) => dispatch(setLoadFoodsAction(payload)),
  setLoadDrinks: (payload) => dispatch(setLoadDrinksAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
