/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import fire from '../../../config/db-firebase';
import Widget from '../Widget';

function ResultWidget({
  results,
  gravadoDB,
  setGravadoDB,
}) {
  function gravarPontuacao(nome, pontuacao) {
    fire.database().ref('leaderboard/').push({
      nome,
      pontuacao,
    });
  }

  const [pontuacao] = useState(results.reduce((result, soma) => result + soma));
  const [nome] = useState(useRouter().query.name);

  if (!gravadoDB) {
    gravarPontuacao(nome, pontuacao);
    setGravadoDB(true);
  }

  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
        {' '}
        {pontuacao}
        {' '}
        Pontos
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x > 0).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`result__${index}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {' '}
              {result}
              {' '}
              pontos
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

export { ResultWidget as default };
