import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    handleGetRepositories();
  }, []);

  async function handleGetRepositories() {
    try {
      const response = await api.get("/repositories");
      setRepositories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddRepository() {
    let repository = {
      title: `ReactJS concepts ${Date.now()}`,
      url: "https://github.com/PauloFerrariDev/gostack-reactjs-concepts",
      techs: ["ReactJS", "JavaScript"],
    };

    try {
      const response = await api.post("/repositories", repository);
      repository = { ...response.data };
      setRepositories([...repositories, repository]);
    } catch (error) {
      console.error(error);
    }

    console.log("Created repository:", repository);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const repositoriesTemp = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories(repositoriesTemp);
    } catch (error) {
      console.error(error);
    }

    console.log("Repository removed.");
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <br />

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
