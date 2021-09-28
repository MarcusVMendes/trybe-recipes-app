import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { setSearchbar as setSearchbarAction } from '../Redux/actions/index';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ setTitle, setSearchbar, search }) {
  function openSearchBar() {
    setSearchbar(!search);
  }

  const history = useHistory();

  function perfilRoute() {
    history.push('/perfil');
  }

  return (
    <header>
      <nav>
        <input
          type="image"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="perfil"
          onClick={ perfilRoute }
        />
        <h1 data-testid="page-title">{ setTitle }</h1>
        <input
          type="image"
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="pesquisar"
          onClick={ openSearchBar }
        />
      </nav>
    </header>
  );
}

Header.propTypes = {
  setTitle: PropTypes.string.isRequired,
  setSearchbar: PropTypes.func.isRequired,
  search: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchbar: (payload) => dispatch(setSearchbarAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
