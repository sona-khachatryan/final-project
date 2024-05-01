'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
   breakpoints: {
      values: {
         xs: 0,
         sm: 700,
         md: 1000,
         lg: 1280,
         xl: 1920,
      },
   },
   typography: {
      fontSize: 14,
      htmlFontSize: 14,
      fontFamily: 'Raleway, sans-serif',
      h1: {
         fontFamily: 'Playfair Display, serif',
         fontWeight: 'bold',
         fontSize: '2rem',
         '@media (min-width:600px)': {
            fontSize: '2.5rem',
         },
         '@media (min-width:960px)': {
            fontSize: '3rem',
         },
      },
      h2: {
         fontFamily: 'Playfair Display, serif',
         fontWeight: 'bold',
         fontSize: '1.5rem',
         '@media (min-width:600px)': {
            fontSize: '1.8rem',
         },
         '@media (min-width:960px)': {
            fontSize: '2rem',
         },
      },
      h3: {
         fontFamily: 'Playfair Display, serif',
         fontWeight: 'bold',
         fontSize: '1.2rem',
         '@media (min-width:600px)': {
            fontSize: '1.4rem',
         },
         '@media (min-width:960px)': {
            fontSize: '1.6rem',
         },
      },
      h4: {
         fontFamily: 'Playfair Display, serif',
         fontWeight: 'bold',
      },
      h5: {
         fontFamily: 'Playfair Display, serif',
         fontWeight: 'bold',
      },
      h6: {
         fontFamily: 'Playfair Display, serif',
         fontWeight: 'bold',
      },
      subtitle1: {
         fontFamily: 'Raleway, sans-serif',
         fontSize: '1rem', // Default font size for subtitle1
      },
      caption: {
         fontFamily: 'Raleway, sans-serif',
         fontSize: '0.8rem', // Font size for caption
         '@media (min-width:1220px)': {
            fontSize: '1rem',
         },
         '@media (min-width:1450px)': {
            fontSize: '1rem',
         },
      },
   },
   components: {
      MuiTypography: {
         defaultProps: {
            variant: 'subtitle1', // Default typography variant
         },
         styleOverrides: {
            root: {
               // Add any additional global typography styles here
            },
         },
      },
      MuiFormControl: {
         defaultProps: {
            size: 'small', // Default size for FormControl

         },
         styleOverrides: {
            root: {
               height: 'inherit', // Height of FormControl inherits from its parent
            },
         },
      },
      MuiInputLabel: {
         defaultProps: {
            size: 'small', // Default size for InputLabel
         },
         styleOverrides: {
            root: ({ shrink }) => ({
               fontSize: '14px', // Font size for InputLabel
            }),
         },
      },
      MuiSelect: {
         styleOverrides: {
            root: {
               height: 'inherit', // Height of Select inherits from its parent
               fontSize: '14px',
            },
         },
      },
      MuiMenuItem: {
         styleOverrides: {
            root: {
               fontSize: '14px', // Font size for MenuItem
            },
         },
      },
      MuiStack: {
         styleOverrides: {
            root: {
               marginTop: '10px', // Add your desired top margin here
            },
         },
      },
      MuiInputBase: {
         styleOverrides: {
            root: {
               fontSize: '16px',
               fontFamily: 'Raleway, sans-serif',
               font: 'inherit'
            },
         },
      },

   },
});

const lightTheme = createTheme({
   ...theme,
   palette: {
      background: {
         primary: '#E8E6E6',
         secondary: '#A4ABA3',
         header: '#715C83'

      },
      text: {
         primary: '#482E5B',
         secondary: '#A4ABA3',
         dropdown: '#482E5B'
      },
      search: {
         primary: '#E8E6E6',
      },
      form: {
         primary: '#A4ABA3'
      },
      button: {
         main: '#9D8FAA',
         secondary: '#715C83',
         text: '#E9E5DA',
         hover: '#715C83',
      },
   },
});

const darkTheme = createTheme({
   ...theme,
   palette: {
      background: {
         primary: '#715C83',
         secondary: '#A4ABA3',
         header: '#715C83'

      },
      text: {
         primary: '#E9E5DA',
         secondary: '#A4ABA3',
         dropdown: '#482E5B'
      },
      search: {
         primary: '#536863',
      },
      form: {
         primary: '#7A8879'
      },
      button: {
         main: '#9D8FAA',
         secondary: '#536863',
         text: '#E9E5DA',
         hover: '#715C83',
      },
   },
});

export {lightTheme, darkTheme};

