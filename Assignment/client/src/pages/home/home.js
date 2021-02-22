import React from 'react';
import Todo from '../../components/Todo/Todo';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();
  
  

  async function logoutfunc(e) {
    e.preventDefault();

    await Axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
  }

  return (
    
      <div className={classes.root}>

      <AppBar position="static">
        <Toolbar>

          <button onClick={logoutfunc}> <Link to="/">Logout</Link></button>

        </Toolbar>
      </AppBar>
      
      <Todo />
     
    </div>
    
    
  );
}