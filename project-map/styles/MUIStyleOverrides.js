export const dialogButton = {
   color: 'text.primary',
   '&:hover': {
      backgroundColor: 'button.main',
      color: 'button.text'
   },
};

export const regularButton = {
   color: 'button.text',
   backgroundColor: 'button.main',
   // borderRadius: 0,
   '&:hover': {
      backgroundColor: 'button.hover',
      color: 'button.text'
   },
};

export const dialogActions = {
   color: 'text.primary',
   backgroundColor: 'background.primary',
};

export const focusedField = {
   '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
         borderColor: 'text.primary',

      },
   },
   '& label.Mui-focused': {
      color: 'text.primary',
   },
};

export const menuItem = {
   color: 'text.dropdown',
   '&:hover': {
      backgroundColor: 'background.primary',
      color: 'text.primary',
   },
   '&.Mui-selected': {
      backgroundColor: 'button.main',
      color: 'button.text',
      '&:hover': {
         backgroundColor: 'background.primary',
         color: 'text.primary'
      }
   }
};

export const modalBox = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '80vw',
   '@media (min-width:1120px)': {
      minWidth: '900px',
      width: 'fit-content'
   },
   height: '80vh',
   backgroundColor: 'background.primary',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4
};