import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
// import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { setError } from '../Redux/Slices/UserSlice';

const CustomAlert =({severity,message})=> {

    const dispatch = useDispatch()

  return (
      <Alert  severity={severity} onClose={()=>dispatch(setError(null))}>
        {message}
      </Alert>
   
  );
}

export default CustomAlert