import React from 'react';
import Header from './components/Header';

/**
 * Componente: 
 * Propriedade:
 *   uma informação que pode ser passada de um componente pai para um
 *   um componente filho.
 * Estado:
*/


function App() {
  return (
    <>
      <Header title="Homepage">
        <ul>
          <li>Homepage</li>
          <li>Projects</li>
        </ul>
      </Header>

      <Header title="Projects">
        <ul>
          <li>Homepage</li>
          <li>Projects</li>
          <li>Login</li>
        </ul>
      </Header>
    </>
  );
}

export default App;