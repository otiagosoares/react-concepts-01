import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handleAddRepository() {

    setLoading(true);

    try{

      const repository = await api.post('/repositories', {
        title: `Repo React Js ${Date.now()}`,
        url: 'https://github.com/otiagosoares/node-concepts',
        techs: [
          "Node",
          "React Js"
        ],
        "likes": 0
      });

      // console.log('repository', repository);
      setRepositories([...repositories, repository.data]);
      setLoading(false);

    }catch(err){
      console.error("erro ao criar repositorio", err);
      setLoading(false);
    }
   
  }

  async function handleRemoveRepository(id) {
    
    setLoading(true);

    try{

      const response = await api.delete(`/repositories/${id}`);
      console.log(response);

      setRepositories(repositories.filter( repository => repository.id !== id));   
      setLoading(false);

    }catch(err){
      setLoading(false);
      console.error('Erro ao deletar repositorio', err);
    }
  }

  useEffect(() => {

    const getRepositoryes = () =>{
      api.get('/repositories').then(response =>{

        console.log(response);
        setRepositories(response.data);
        setLoading(false);
      });
    }

    getRepositoryes();
  }, []);


  return (
    <div>
      {loading && <p>Loading...</p>}
      <ul data-testid="repository-list">
        {repositories.length > 0 && repositories.map(repo =>(
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>

        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
