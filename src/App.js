import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, Repository, SearchUsers } from 'features';
import Home from 'features/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<SearchUsers />} />
          <Route path="repo" element={<Repository />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
