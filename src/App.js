import { useQuery } from '@apollo/client';
import { SEARCH_USER } from './GraphQL/queries';

function App() {
  const { loading, error, data } = useQuery(SEARCH_USER);
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
}

export default App;
