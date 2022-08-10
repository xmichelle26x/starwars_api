import { useState, useEffect, useRef } from 'react'
import './App.css';
// import data from './data.json';
import { getCharacter, getPeople, searchCharacter } from './api/people';

function App() {
  const inputSearch = useRef(null);
  const [textSearch, setTextSearch] = useState("");
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
  }, [currentCharacter]);


  const handleError = (error) => {
    setErrorState({ hasError: true, message: error.message })
  };


  const showDetails = (character) => {
    const id = Number(character.url.split('/').slice(-2)[0]);
    setCurrentCharacter(id);
  }

  const onChangeTextSearch = (event) => {
    event.preventDefault();
    const text = inputSearch.current.value;
    setTextSearch(text);
  }

  const onSearchSubmit = (event) => {
    if (event.key !== 'Enter') return;

    inputSearch.current.value = "";
    setDetails({});
    searchCharacter(textSearch)
      .then((data) => setPeople(data.results))
      .catch(handleError);
  }

  return (
    <div>
      <input
        ref={inputSearch}
        onChange={onChangeTextSearch}
        onKeyDown={onSearchSubmit}
        type="text"
        placeholder='Search a character'
      />
      <ul>
        <h1>Star Wars characters</h1>
        {errorState.hasError && <div>{errorState.message}</div>}
        {people.map((character) => (
          <li key={character.name} onClick={() => showDetails(character)} style={{ cursor: 'pointer' }}>{character.name}</li>
        ))}
      </ul>
      {details && (
        <aside>
          <h1>{details.name}</h1>
          <ul>
            <li>Gender: {details.gender}</li>
            <li>Height: {details.height}</li>
            <li>Mass: {details.mass}</li>
            <li>Birthday year: {details.birth_year}</li>
          </ul>
        </aside>
      )}
    </div>
  );
}


export default App;
