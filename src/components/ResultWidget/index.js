/* eslint-disable react/prop-types */
import React from 'react';
import Widget from '../Widget';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
        {' '}
        {results.reduce((result, soma) => result + soma)}
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
