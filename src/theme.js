import { createTheme } from '@mui/material/styles';

const appTheme = createTheme({
    palette: {
      primary: {
        light: '#484848',
        main: '#212121',
        dark: '#000000',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#ffff6c',
        main: '#ccdb37',
        dark: '#98aa00',
        contrastText: '#000000',
      },
    },
  });

export default appTheme;
