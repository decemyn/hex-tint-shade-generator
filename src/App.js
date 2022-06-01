
import React, { useState } from 'react'
import {Helmet} from 'react-helmet';
import './App.css';
import '@fontsource/roboto/300.css';
import Values from 'values.js'
import appTheme from './theme.js';
import ColorBox from './ColorBox';
import useWindowDimensions from './util/window-dimensions';
import { Container, Box, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { TextField, Button } from '@mui/material';


function App() {
  var randomHex = require('random-hex');
  const { height, width } = useWindowDimensions();
  const defaultColor = '#ffffff'
  const [color, setColor] = useState(defaultColor)
  const [fieldError, setFieldError] = useState(false);
  const [list, setList] = useState(new Values(defaultColor).all(10))
  const defaultFieldHelperText = 'Insert HEX code.'
  const errorFieldHelperText = 'Insert valid HEX code.'
  const [fieldHelperText, setFieldHelperText] = useState(defaultFieldHelperText);
  const [fieldValue, setFieldValue] = useState(defaultColor);

  const randomGenerate = (e) => {
    e.preventDefault();
    setFieldValue(randomHex.generate());
    setColor(randomHex.generate());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10)
      setList(colors)
      setFieldError(false)
      setFieldHelperText(defaultFieldHelperText)
    } catch (error) {
      setFieldError(true)
      setFieldHelperText(errorFieldHelperText)
      console.log(error)
    }
  }
  

  return (
    <ThemeProvider theme={appTheme}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
        <meta name="description" content="HEX Color Tint and Shade Generator"/>
        <style>{'body { background-color: #212121; }'}</style>
        <title>HEX Color Tint and Shade Generator</title>
      </Helmet>
      <Container maxWidth={false} sx={{height: {height}, backgroundColor: 'primary.main'}}>
          <Paper sx={{backgroundColor: 'primary.light', my: 4}}>
            <Typography variant='h1' sx={{textAlign: 'center', padding: '1%'}}>Color Tint and Shade variants generator</Typography>
            <Typography variant='h4' sx={{textAlign: 'center', padding: '1%'}}>Easily generate tint and shade variants for a hex color string</Typography>
          </Paper>
          
          <Paper sx={{backgroundColor: 'primary.light', my: 4, width: '70%'}}>

            <form onSubmit={handleSubmit}>

            <TextField error={fieldError} 
                       helperText={fieldHelperText} 
                       label="HEX color code" 
                       value={fieldValue}
                       onChange={(e) => setColor(e.target.value)}
                       sx={{width: '80%', margin: '2.5%'}}>
            </TextField>
            <Button type="submit" 
                    variant="contained" 
                    sx={{width: '35%' , margin: '2.5%', marginTop: 0}}      
            >Submit</Button>
            <Button
                    variant="contained"
                    onClick={randomGenerate}
                    sx={{width: '35%' , margin: '2.5%', marginTop: 0}}      
            >Random</Button>
            
            </form>

          </Paper>

      <Paper sx={{backgroundColor: 'primary.light', padding: '2.5%', my: 4}}>
        <section className='colors'>
          {list.map((color, index) => {
            return (
              <ColorBox
                key={index}
                {...color}
                index={index}
                hexColor={color.hex}
              />
            )
          })}
        </section>
      </Paper>

      </Container>
    </ThemeProvider>
  );
}

export default App;
