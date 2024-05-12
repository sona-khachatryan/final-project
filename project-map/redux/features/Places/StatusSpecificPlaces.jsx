'use client';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
   Box,
   Button,
   Card, CardActions,
   CardContent,
   CardMedia, CircularProgress,
   Divider,
   Grid,
   IconButton, LinearProgress,
   Modal,
   Paper,
   Stack,
   Typography
} from '@mui/material';
import {modalBox, regularButton} from '@/styles/MUIStyleOverrides';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';
import {useParams, useRouter} from 'next/navigation';
import {getSpecificPlaceList} from '@/redux/features/Places/placesThunks';
import PaginationComponent from '@/redux/features/Pagination/PaginationComponent';

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));

function StatusSpecificPlaces(props) {
   const {currentPage, pageSize} = useSelector((state) => state.pagination);
   const {visited, toBeVisited} = useSelector((state) => state.places);
   const router = useRouter();
   const dispatch = useDispatch();
   const {id: userId} = useSelector(state =>  state.user);
   const [currentList, setCurrentList] = useState([]);
   const {visitStatus} = useParams();
   const [disableNextBtn, setDisableNextBtn] = useState(false);

   useEffect(() => {
      dispatch(getSpecificPlaceList({visitStatus, userId}));
      console.log(visitStatus, userId, 'whytf')
   }, [visitStatus, userId]);

   useEffect(() => {
      if(visitStatus === 'visited') {
         setCurrentList(visited);
      } else if (visitStatus === 'toBeVisited') {
         setCurrentList(toBeVisited);
      }
   }, [visitStatus, visited.length, toBeVisited.length]);

   const startIndex = (currentPage - 1) * pageSize;
   const endIndex = startIndex + pageSize;
   const currentPageData = currentList?.length ? currentList.slice(startIndex, endIndex) : [];

   useEffect(() => {
      if(endIndex >= currentList?.length) {
         setDisableNextBtn(true);
      } else {
         setDisableNextBtn(false);
      }
   }, [endIndex, currentList?.length]);

   const userName = 'kremisperi';
   const handleClose = () => {
      router.push(`/${userName}/my_places/`);
   };

   return (
      <div>
         <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <>
               <Box sx={modalBox}>
                  <IconButton sx={{position: 'absolute', top: 10, right: 10, color: 'text.primary'}} onClick={handleClose} aria-label="delete" color="black" size='small'>
                     <CloseIcon/>
                  </IconButton>
                  <Grid
                     container
                     direction="row"
                     spacing={2}
                     justifyContent='space-around'
                  >
                     {currentPageData?.length ? currentPageData.map(place =>
                        <Grid item xs={6} md={6} key={place?.id}>
                           <Card
                              onClick={() => router.push(`/map/${place.id}`)}
                              sx={{ maxWidth: 345 , height: 220, backgroundColor: 'background.card'}}>
                              <CardMedia
                                 component="img"
                                 alt={place?.title}
                                 height="140"
                                 image={place?.image}
                              />
                              <CardContent sx={{backgroundColor: 'background.card'}}>
                                 <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    sx={{
                                       color: 'text.primary',
                                       font: 'inherit',
                                       '@media (min-width:200px) and (max-width:420px)': {
                                          fontSize: '13px',
                                       },
                                       '@media (min-width:421px) and (max-width:620px)': {
                                          fontSize: '15px',
                                       },

                                    }}>
                                    {place?.title}
                                 </Typography>
                              </CardContent>
                           </Card>
                        </Grid>
                     ) :
                        <Grid item>
                           <CircularProgress sx={{color:'text.primary'}} />
                        </Grid>

                     }
                     {currentList?.length > pageSize  ?
                        <div>
                           <PaginationComponent disableNext={disableNextBtn}/>
                           <Typography
                              sx={{
                                 marginTop: '20px',
                                 color: 'text.primary',
                                 font: 'inherit',
                                 position: 'absolute',
                                 right: '40px',
                                 bottom: '25px'
                              }}>
                              {endIndex <= currentList?.length ? endIndex : currentList?.length}/{currentList?.length}
                           </Typography>
                        </div>
                        :
                        ''
                     }

                  </Grid>
               </Box>
            </>
         </Modal>
      </div>
   );
}

export default StatusSpecificPlaces;