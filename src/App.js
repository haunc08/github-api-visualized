import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout, Repository, SearchUsers, Home } from 'features';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<SearchUsers />} />
          <Route path="repository/:owner/:name" element={<Repository />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
