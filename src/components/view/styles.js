import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
 
    main:{
       backgroundColor:'#b2bec3',
       height:'100vh',
       overflow:'hidden',
    },
    view:{
        overflowY:'auto',
        height:'100vh',
        backgroundColor:'white',
        padding:'20px',
    },
    heading:{
        fontFamily: 'Akaya Telivigala',
        color:'#6c5ce7',
    }
 
}));