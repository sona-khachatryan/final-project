'use client';

import React, {useEffect, useState} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {changeStatus, editPlace} from '@/redux/features/SinglePlace/singlePlaceThunks';
import {
   Box,
   Button,
   Grid,
   Stack,
   TextField,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {setIsInEditMode} from '@/redux/features/SinglePlace/singlePlaceSlice';
import {dialogButton, focusedField, menuItem, regularButton} from '@/styles/MUIStyleOverrides';
import {addNewPlace} from '@/redux/features/Places/placesThunks';
import {setIsInAddNewPlaceMode} from '@/redux/features/Places/placesSlice';

function SinglePlaceEditMode(props) {
   const params = useParams();
   const placeId = params.placeId;
   const dispatch = useDispatch();
   const currentPlace = useSelector(state => state.singlePlace.data);
   const addNewPlaceMode = useSelector(state => state.places.isInAddNewPlaceMode);
   const router = useRouter();
   const pathname = usePathname();

   // const [addNewPlaceMode, setAddNewPlaceMode] = useState(pathname.includes('new'));
   //
   // useEffect(() => {
   //    if(pathname.includes('new')) {
   //       setAddNewPlaceMode(true);
   //    } else {
   //       setAddNewPlaceMode(false);
   //    }
   // }, [pathname]);

   const [dialogIsOpen, setDialogIsOpen] = useState(false);
   const [titleInputValue, setTitleInputValue] = useState(addNewPlaceMode ? '' : currentPlace?.title);
   const [extractInputValue, setExtractInputValue] = useState(addNewPlaceMode ? '' : currentPlace?.extract);
   const [typeInputValue, setTypeInputValue] = useState(addNewPlaceMode ? '' : currentPlace?.type);
   const [imageUrlInputValue, setImageUrlInputValue] = useState(addNewPlaceMode ? '' : currentPlace?.image);
   const [latitudeInputValue, setLatitudeInputValue] = useState(addNewPlaceMode ? '' : currentPlace?.coordinates?.lat);
   const [longitudeInputValue, setLongitudeInputValue] = useState(addNewPlaceMode ? '' : currentPlace?.coordinates?.lon);
   const [wikiUrlInputValue, setWikiUrlInputValue] = useState(addNewPlaceMode ? '' : currentPlace?.url);
   const [typeSelectValue, setTypeSelectValue] = useState(addNewPlaceMode ? '' : currentPlace?.type);

   const [imageUrlError, setImageUrlError] = useState('');
   const [wikiUrlError, setWikiUrlError] = useState('');
   const [longitudeError, setLongitudeError] = useState('');
   const [latitudeError, setLatitudeError] = useState('');
   const [titleError, setTitleError] = useState('');
   const [typeError, setTypeError] = useState('');

   useEffect(() => {
      // validate URL
      const isValidUrl = (url) => {
         try {
            new URL(url);
            return true;
         } catch (error) {
            return false;
         }
      };

      // validate latitude and longitude
      const isValidLatitude = (lat) => {
         return !isNaN(Number(lat)) && Math.abs(lat) <= 90;
      };

      const isValidLongitude = (long) => {
         return !isNaN(Number(long)) && Math.abs(long) <= 180;
      };

      // Resetting errors
      setImageUrlError('');
      setWikiUrlError('');
      setLongitudeError('');
      setLatitudeError('');
      setTitleError('');
      setTypeError('');

      // Validation logic
      if (imageUrlInputValue && !isValidUrl(imageUrlInputValue)) {
         setImageUrlError('Please enter a valid image URL.');
      }

      if (wikiUrlInputValue && !isValidUrl(wikiUrlInputValue)) {
         setWikiUrlError('Please enter a valid Wikipedia URL.');
      }

      if (!longitudeInputValue || !isValidLongitude(longitudeInputValue)) {
         setLongitudeError('Please enter a valid longitude (-180 to 180).');
      }

      if (!latitudeInputValue || !isValidLatitude(latitudeInputValue)) {
         setLatitudeError('Please enter a valid latitude (-90 to 90).');
      }


      if (!titleInputValue) {
         setTitleError('Title is required.');
      }

      if (!typeSelectValue) {
         setTypeError('Type is required.');
      }
   }, [titleInputValue, longitudeInputValue, latitudeInputValue, imageUrlInputValue, wikiUrlInputValue, typeSelectValue]);

   const [saveIsDisabled, setSaveIsDisabled] = useState(false);

   useEffect(() => {
      if(titleError || longitudeError || latitudeError || wikiUrlError || imageUrlError || typeError) {
         setSaveIsDisabled(true);
      } else {
         setSaveIsDisabled(false);
      }
   }, [titleError, longitudeError, latitudeError, wikiUrlError, imageUrlError, typeError]);



   const handleSave = () => {
      const updatedPlace = {
         title: titleInputValue,
         type: typeSelectValue,
         image: imageUrlInputValue,
         coordinates: {
            lat: +(latitudeInputValue),
            lon: +(longitudeInputValue),
         },
         url: wikiUrlInputValue,
         extract: extractInputValue,
      };

      if(addNewPlaceMode) {
         dispatch(addNewPlace({updatedPlace}));
         dispatch(setIsInAddNewPlaceMode(false));
         router.back();
      } else {
         //edit mode
         dispatch(editPlace({placeId, updatedPlace}));
         dispatch(setIsInEditMode(false));
      }
   };

   const handleCancel = () => {
      if(addNewPlaceMode) {
         dispatch(setIsInAddNewPlaceMode(false));
         router.back();
      } else {
         dispatch(setIsInEditMode(false));
      }
   };

   const handleTypeSelectChange = (e) => {
      setTypeSelectValue(e.target.value);
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
                     required
                     error={!!titleError}
                     helperText={titleError}
                     value={titleInputValue}
                     onChange={(e) => setTitleInputValue(e.target.value)}
                  />

                  <Box sx={{ minWidth: 120, maxWidth: 200, height: '35px', margin: '10px 8px' }} >
                     <FormControl required fullWidth sx={{color:'text.primary', ...focusedField}}>
                        <InputLabel id="demo-simple-select-label" sx={{color:'text.primary'}}>Type</InputLabel>
                        <Select
                           displayEmpty
                           value={typeSelectValue}
                           label="Type"
                           onChange={handleTypeSelectChange}
                           sx={{color:'text.primary',}}
                        >
                           <MenuItem value='church' sx={menuItem}>Church</MenuItem>
                           <MenuItem value='museum' sx={menuItem}>Museum</MenuItem>
                           <MenuItem value='oldest extant buildings' sx={menuItem}>Preserved Historical Building</MenuItem>
                        </Select>
                     </FormControl>
                  </Box>
                  
                  {/*<TextField*/}
                  {/*   id="outlined-multiline-static"*/}
                  {/*   label="Type"*/}
                  {/*   sx={focusedField}*/}
                  {/*   value={typeInputValue}*/}
                  {/*   onChange={(e) => setTypeInputValue(e.target.value)}*/}
                  {/*/>*/}
                  <TextField
                     id="outlined-multiline-static"
                     label="Image URL"
                     sx={focusedField}
                     type='url'
                     multiline
                     error={!!imageUrlError}
                     helperText={imageUrlError}
                     value={imageUrlInputValue}
                     onChange={(e) => setImageUrlInputValue(e.target.value)}
                  />
                  <TextField
                     id="outlined-multiline-static"
                     label="Latitude"
                     sx={focusedField}
                     required
                     error={!!latitudeError}
                     helperText={latitudeError}
                     value={latitudeInputValue}
                     onChange={(e) => setLatitudeInputValue(e.target.value)}
                  />
                  <TextField
                     id="outlined-multiline-static"
                     label="Longitude"
                     sx={focusedField}
                     required
                     error={!!longitudeError}
                     helperText={longitudeError}
                     value={longitudeInputValue}
                     onChange={(e) => setLongitudeInputValue(e.target.value)}
                  />
                  <TextField
                     id="outlined-multiline-static"
                     label="Wikipedia URL"
                     multiline
                     type='url'
                     sx={focusedField}
                     error={!!wikiUrlError}
                     helperText={wikiUrlError}
                     value={wikiUrlInputValue}
                     onChange={(e) => setWikiUrlInputValue(e.target.value)}
                  />
                  <Stack spacing={1} direction="row" sx={{ position: 'absolute', bottom: 40, left: 40}}>
                     <Button onClick={handleCancel} variant="outlined" color='button' sx={regularButton}>Cancel</Button>
                     <Button onClick={() => setDialogIsOpen(true)} disabled={saveIsDisabled} variant="outlined" color='button' sx={regularButton}>Save</Button>

                  </Stack>
                  <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
                     <DialogTitle sx={{backgroundColor: 'background.primary'}}>Confirm Changes</DialogTitle>
                     <DialogContent  sx={{backgroundColor: 'background.primary'}}>
                        {addNewPlaceMode ?
                           `Are you sure you want to add ${titleInputValue} to the database with the following coordinates?
                            Lat: ${latitudeInputValue} Lon: ${longitudeInputValue}
                           `
                           :
                           'Are you sure you want to save the changes?'
                        }
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
                     maxRows={22}
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