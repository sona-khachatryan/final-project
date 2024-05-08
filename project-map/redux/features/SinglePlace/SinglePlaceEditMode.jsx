'use client';

import React, {useState} from 'react';
import {useParams} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {editPlace} from '@/redux/features/SinglePlace/singlePlaceThunks';
import {Box, Button, Grid, Stack, TextField, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import {setIsInEditMode} from '@/redux/features/SinglePlace/singlePlaceSlice';
import {dialogButton, focusedField, regularButton} from '@/styles/MUIStyleOverrides';


function SinglePlaceEditMode(props) {
   const params = useParams();
   const placeId = params.placeId;
   const dispatch = useDispatch();
   const currentPlace = useSelector(state => state.singlePlace.data);

   const [dialogIsOpen, setDialogIsOpen] = useState(false);
   const [titleInputValue, setTitleInputValue] = useState(currentPlace?.title);
   const [extractInputValue, setExtractInputValue] = useState(currentPlace?.extract);
   const [typeInputValue, setTypeInputValue] = useState(currentPlace?.type);
   const [imageUrlInputValue, setImageUrlInputValue] = useState(currentPlace?.image);
   const [latitudeInputValue, setLatitudeInputValue] = useState(currentPlace?.coordinates?.lat);
   const [longitudeInputValue, setLongitudeInputValue] = useState(currentPlace?.coordinates?.lon);
   const [wikiUrlInputValue, setWikiUrlInputValue] = useState(currentPlace?.url);

   const handleSave = () => {
      const updatedPlace = {
         title: titleInputValue,
         type: typeInputValue,
         image: imageUrlInputValue,
         coordinates: {
            lat: +(latitudeInputValue),
            lon: +(longitudeInputValue),
         },
         url: wikiUrlInputValue,
         extract: extractInputValue,
      };

      dispatch(editPlace({placeId, updatedPlace}));
      dispatch(setIsInEditMode(false));

   };

   return (
      <>
         <Box
            component="form"
            sx={{
               '& .MuiTextField-root': { m: 1, width: 'fit-content', minWidth: '25ch', maxWidth: '400px' },
            }}
            noValidate
            autoComplete="off"
         >
            <Grid container
               direction="row"
               justifyContent="space-around">
               <Grid container direction="column" xs={12} md={4}>
                  <TextField
                     id="outlined-multiline-static"
                     label="Title"
                     sx={focusedField}
                     multiline
                     value={titleInputValue}
                     onChange={(e) => setTitleInputValue(e.target.value)}
                  />
                  <TextField
                     id="outlined-multiline-static"
                     label="Type"
                     sx={focusedField}
                     value={typeInputValue}
                     onChange={(e) => setTypeInputValue(e.target.value)}
                  />
                  <TextField
                     id="outlined-multiline-static"
                     label="Image URL"
                     sx={focusedField}
                     multiline
                     value={imageUrlInputValue}
                     onChange={(e) => setImageUrlInputValue(e.target.value)}
                  />
                  <TextField
                     id="outlined-multiline-static"
                     label="Latitude"
                     sx={focusedField}
                     value={latitudeInputValue}
                     onChange={(e) => setLatitudeInputValue(e.target.value)}
                  />
                  <TextField
                     id="outlined-multiline-static"
                     label="Longitude"
                     sx={focusedField}
                     value={longitudeInputValue}
                     onChange={(e) => setLongitudeInputValue(e.target.value)}
                  />
                  <TextField
                     id="outlined-multiline-static"
                     label="Wikipedia URL"
                     multiline
                     sx={focusedField}
                     value={wikiUrlInputValue}
                     onChange={(e) => setWikiUrlInputValue(e.target.value)}
                  />
                  <Stack spacing={1} direction="row" sx={{ position: 'absolute', bottom: 40, left: 40}}>
                     <Button onClick={() => dispatch(setIsInEditMode(false))} variant="outlined" color='button' sx={regularButton}>Cancel</Button>
                     <Button onClick={() => setDialogIsOpen(true)} variant="outlined" color='button' sx={regularButton}>Save</Button>

                  </Stack>
                  <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
                     <DialogTitle sx={{backgroundColor: 'background.primary'}}>Confirm Changes</DialogTitle>
                     <DialogContent  sx={{backgroundColor: 'background.primary'}}>
                           Are you sure you want to save the changes?
                     </DialogContent>
                     <DialogActions sx={{color: 'text.primary', backgroundColor: 'background.primary'}}>
                        <Button onClick={() => setDialogIsOpen(false)} sx={dialogButton}>Cancel</Button>
                        <Button onClick={handleSave} sx={dialogButton}>Save</Button>
                     </DialogActions>
                  </Dialog>
               </Grid>
               <Grid width='400px' item xs={12} md={8}>
                  <TextField
                     id="outlined-multiline-static"
                     label="Extract"
                     multiline
                     value={extractInputValue}
                     onChange={(e) => setExtractInputValue(e.target.value)}
                     size='medium'
                     sx={{
                        '& .MuiInputBase-root': {
                           width: '500px',
                        },
                        ...focusedField,
                        display: { xs: 'none', sm: 'none', md: 'block'},
                     }}
                  />
               </Grid>
            </Grid>
         </Box>
      </>
   );
}

export default SinglePlaceEditMode;