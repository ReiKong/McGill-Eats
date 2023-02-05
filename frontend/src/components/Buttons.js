import * as React from 'react';
import Button from '@mui/material/Button'; 
import LocationOnIcon from '@mui/icons-material/LocationOn';


export default function currLocationButton() {
   return (
       <Button variant = "contained" startIcon = {<LocationOnIcon />}>
           Current Location
       </Button>
   );
}
