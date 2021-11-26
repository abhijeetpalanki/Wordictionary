import { useState ,useEffect } from "react";
import axios from 'axios';
import './App.css';
import bgDark from './bg.png';
import bgLight from './bg-light.jpg';
import { Container, Switch, withStyles } from "@material-ui/core";
import Header from "./components/Header/Header";
import Definitions from "./components/Definitions/Definitions";
import { grey } from "@material-ui/core/colors";

function App() {
  const [word, setWord] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);

  const DarkMode = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);

      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(meanings);

  useEffect(() => {
    dictionaryApi();
  }, [word, category])

  return (
    <div style={{height: '100vh', backgroundImage: lightMode ? `url(${bgLight})`: `url(${bgDark})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', color: lightMode ? 'black' : 'white', transition: 'all 0.5s linear'}}>
      <Container maxWidth="md" style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: "space-evenly"}}>
        <div style={{position: 'absolute', top: 0, right: 15, paddingTop: 10}}>
          <span>{lightMode ? "Dark" : "Light"} Mode</span>
          <DarkMode checked={lightMode} onChange={() => setLightMode(!lightMode)} />
        </div>
        <Header category={category} setCategory={setCategory} word={word} setWord={setWord} lightMode={lightMode} />
        {meanings && (<Definitions meanings={meanings} word={word} category={category} lightMode={lightMode} />)}
      </Container>
    </div>
  );
}

export default App;
