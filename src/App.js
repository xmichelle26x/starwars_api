import { useState, useEffect } from 'react'
import './App.css';
// import data from './data.json';
import { getCharacter, getPeople } from './api/people';

function App() {
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(1);
  const [details, setDetails] = useState({});
  const [errorState, setErrorState] = useState({ hasError: false })


  useEffect(() => {
    getPeople()
      .then((data) => setPeople(data.results)).catch(handleError);
  }, []);


  useEffect(() => {
    getCharacter(currentCharacter).then(setDetails).catch(handleError);
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
    <div>
      <ul>
        {errorState.hasError && <div>{errorState.message}</div>}
        {people.map((character) => (
          <li key={character.name} onClick={() => showDetails(character)}>{character.name}</li>
        ))}
      </ul>
      {details && (
        <aside>
          <h1>{details.name}</h1>
          <h1>{details.gender}</h1>
          <h1>{details.birth_year}</h1>
        </aside>
      )}
    </div>
  );
}


export default App;
