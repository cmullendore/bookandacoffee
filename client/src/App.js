import React from 'react';
import auth from './utils/auth';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Home, Profile, ReadBooks, SearchBooks, SavedBooks } from './pages'

import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const [currentPage, setCurrentPage] = useState('Home');

// This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
const renderPage = () => {

  // We only ever want to navigate to these if the user is logged in
  if (auth.loggedIn()) {
    switch (currentPage) {
      case 'SearchBooks':
        return <SearchBooks />
        break;
      case 'SavedBooks':
        return <SavedBooks />
        break;
      case 'ReadBooks':
        return <ReadBooks />
        break;
      case 'Profile':
        return <Profile />
        break;
      case 'ReviewBook':
        // This won't show up in the tabs but will be called
        // when the "Review this book" (or whatever) button
        // is pressed.
        return <ReviewBook />
        break;
    }
  }

  return <Home />;
};

const handlePageChange = (page) => setCurrentPage(page);


function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        {/* We are passing the currentPage from state and the function to update it */}
        <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
        {/* Here we are calling the renderPage method which will return a component  */}
        {renderPage()}
      </div>
    </ApolloProvider>
  );
}

export default App;
