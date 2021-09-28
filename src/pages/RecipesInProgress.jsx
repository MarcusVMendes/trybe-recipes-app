// Tela de receita em progresso: requisitos 47 a 53;
import React from 'react';

function RecipesInProgress() {
  return (
    <div>
      <img src="" alt="" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">Titulo</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <h3 data-testid="recipe-category">Categoria</h3>
      <p data-testid="{index}-ingredient-step">Ingredientes</p>
      <p data-testid="instructions">Instruções</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default RecipesInProgress;

/*
Lembrates:
mudar o p do ingrediente para uma li se for o caso.
checar qual é o index dinamico que o ingrediente espera.
atentar para a explicação sobre o tamanho do atributo ingrediente no readme
*/
