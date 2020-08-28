import React, { useState } from 'react';

import Header from './components/Header';

/**
 * Components: 
 * Properties:
 * State & Immutability:
*/


function App() {
  const [projects, setProjects] = useState(['To develop a new app', 'Front-end web']);

  function handleAddProject() {
    // projects.push(`New project ${Date.now()}`);

    setProjects([...projects, `New project ${Date.now()}`]);  

    console.log(projects);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Add a new project</button>
    </>
  );
}

export default App;