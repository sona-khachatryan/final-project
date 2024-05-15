'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from './paginationSlice';
import {useParams, useRouter} from 'next/navigation';
import {Button, Stack} from '@mui/material';
import {regularButton} from '@/styles/MUIStyleOverrides';

function PaginationComponent({disableNext}) {
   const dispatch = useDispatch();
   const router = useRouter();
   const {currentPage, pageSize} = useSelector((state) => state.pagination);
   const {visitStatus} = useParams();
   const {userName} = useSelector(state => state.user);

   const handlePageChange = (page) => {
      dispatch(setCurrentPage(page));
      router.push(`/${userName}/my_places/${visitStatus}?page=${page}`);
   };

   return (
      <Stack spacing={1} direction="row" sx={{
         position: 'absolute', 
         bottom: 40, 
         left: 30, 
         '@media (min-width:300px) and (max-width:800px)': {
            bottom: 20,
            left: 30,
         }}}>
         <Button onClick={() => handlePageChange(currentPage - 1)} variant="outlined" color='button' disabled={currentPage-1 < 1} sx={regularButton}>Previous</Button>
         <Button onClick={() => handlePageChange(currentPage + 1)} variant="outlined" color='button' disabled={disableNext} sx={regularButton}>Next</Button>
      </Stack>
   );
}

export default PaginationComponent;