import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Box } from '@mui/system';

import Editor from './components/Editor.js';
import Viewer from './components/Viewer';

function App () {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              App Name
            </Typography>
            <Button color='inherit' component={Link} to='/'>Editor</Button>
            <Button color='inherit' component={Link} to='/viewer'>Viewer</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <Routes>
          <Route path='/viewer' element={<Viewer />} />
          <Route path='/' element={<Editor />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
