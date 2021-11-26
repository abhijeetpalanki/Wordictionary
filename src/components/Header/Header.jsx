import { createTheme, MenuItem, TextField, ThemeProvider } from '@material-ui/core';
import React from 'react';
import './Header.css';
import categories from '../../data/category';

const Header = ({category, setCategory, word, setWord, lightMode}) => {
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: lightMode ? '#000' : '#fff'
            },
            type: lightMode ? 'light' : 'dark',
        },
      });

      const handleChange = (language) => {
        setCategory(language);
        setWord("");
      }

    return (
        <div className="header">
            <span className="title">{word? word : "WorDictionary"}</span>
            <div className="inputs">
                <ThemeProvider theme={darkTheme}>
                    <TextField className="search" label="Search a word..." value={word} onChange={(e) => setWord(e.target.value)} />
                    <TextField className="select" id="select-language" select label="Language" value={category} onChange={(e) => handleChange(e.target.value)}>
                        {
                            categories.map((option) => (
                                <MenuItem key={option.label} value={option.label}>{option.value}</MenuItem>
                            ))
                        }
                    </TextField>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Header
