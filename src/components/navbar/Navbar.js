import React, {useState} from 'react';
import Card from '@mui/material/Card';
import { styled, alpha } from '@mui/material/styles';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import "../card/styles.css";
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Link} from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));




export default function SearchAppBar() {
  const  [tags, setTags] = useState('');
  const [cards, setCards] = useState([]);
  const [data, setData] = useState(
    {  id:'',
      title:'',
      content:'',
      tags:''
    }
  );
  const search = (e) =>{
    e = e.trim();
    axios.get('http://localhost:5000/flash/' + e)
    .then(res => {
    console.log(res.data);
    setCards(res.data);
    console.log(cards);
    })
    .catch(function (error) {
      console.log(error);
    })
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
       console.log(tags);
       search(tags);
    }
};

  const deleteCard = (id) => {
    console.log(id);
    axios.delete('http://localhost:5000/flash/delete/'+id)
    .then(response => { console.log(response.data)});
    setCards(cards.filter(el => el._id !== id));
   };


  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
      
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
           Flash
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              onKeyUp={handleKeyPress}
             />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
    <Grid  container justifyContent="flex-end"  alignItems="center">
      <Link style={{textDecoration:'none'}}  to={"/add"}>
      <Fab style={{ margin: '20px' }} size="medium" color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
      </Link>
             
            </Grid>

            <Grid style={{ padding: '5%' }} container rowSpacing={4} columnSpacing={6}>
                { cards &&  cards.map((card) => (
                    <Grid item key={card._id} xs={12} sm={6} md={4}>
                        <Card style={{ borderLeft: '5px solid purple' }} >
                            <CardContent>
                                <Typography sx={{ fontSize: 14, textAlign: 'right' }} color="text.secondary" gutterBottom>
                                    12/3/2021 04:45 PM
                                </Typography>
                                <Typography variant="h5" component="div">
                                  {card.title}
                                </Typography>
                                <Typography color="text.secondary">
                                 
                                        Tags:
                                    
                                </Typography>
                                <Typography variant='body2' >
                                    <Grid
                                     display="flex"
                                     justifyContent="start"
                                     alignItems="center"
                                     flexWrap="wrap"
                                    >
                                    { card.tags &&  card.tags.map((tag) => (

                                        <code>
                                            {tag}
                                        </code>
                                    ))}

                                    </Grid>
                                  </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container direction="row"
                                    justifyContent="space-around"
                                    alignItems="center"
                                >
                                   
                                        <Link style={{textDecoration:'none'}} to={"/cardview/" + card._id}>
                                        <Button style={{ marginLeft: '8px', marginTop: '5px' }} color="success" variant="contained" startIcon={<VisibilityIcon />}>
                                        View
                                        </Button>
                                        </Link>
                                   
                                    <Button style={{ marginLeft: '8px', marginTop: '5px' }} variant="contained" startIcon={<ModeEditIcon />}>
                                        Edit
                                    </Button>
                                    <Button style={{ marginLeft: '8px', marginTop: '5px' }} color="error" variant="contained" onDoubleClick={ () => deleteCard(card._id)} startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
</>
  );
}


