import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Editor from './components/Editor.js';
import Viewer from './components/Viewer';

function App () {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to='/'>Editor</Link></li>
            <li><Link to='/viewer'>Viewer</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path='/viewer' element={<Viewer />} />
          <Route path='/' element={<Editor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
