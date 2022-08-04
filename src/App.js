import { useState, useEffect } from 'react'
import './App.css';
// import data from './data.json';
import { getPeople } from './api/people';

function App() {
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(1);
  const [errorState, setErrorState] = useState({ hasError: false })

  useEffect(() => {
    getPeople()
    .then((data) => setPeople(data.results)).catch(handleError);
  }, []);

  useEffect(() => { 
    
  }, 
  [currentCharacter]);

  const handleError = (error) => {
    setErrorState({ hasError: true, message: error.message })
  };

  const showDetails = (character) => {
    const id = Number(character.url.split('/').slice(-2)[0]);
    setCurrentCharacter(id);
   }


  return (
    <ul>
      {errorState.hasError && <div>{errorState.message}</div>}
      {people.map((character) => (
        <li key={character.name} onClick={() => showDetails(character)}>{character.name}</li>
      ))}
    </ul>
  );
}


export default App;
