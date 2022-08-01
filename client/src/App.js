import React, { useState } from 'react';
import auth from './utils/auth';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Home, Profile, ReadBooks, SearchBooks, SavedBooks, ReviewBook } from './pages'

import Navtabs from './components/Navtabs';
import { Router } from 'react-router-dom';

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

function App() {

  const [currentPage, setCurrentPage] = useState('Home');

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {

    // We only ever want to navigate to these if the user is logged in
    //if (auth.loggedIn()) {
      switch (currentPage) {
        case 'SearchBooks':
          return <SearchBooks />
        case 'SavedBooks':
          return <SavedBooks />
        case 'ReadBooks':
          return <ReadBooks />
        case 'Profile':
          return <Profile />
      }
    //}

    return <Home />;
  };

  const handlePageChange = (page) => setCurrentPage(page);



  return (
    <ApolloProvider client={client}>
      <div>
        {/* We are passing the currentPage from state and the function to update it */}
        <Navtabs currentPage={currentPage} handlePageChange={handlePageChange} />
        {/* Here we are calling the renderPage method which will return a component  */}
        {renderPage()}
      </div>
    </ApolloProvider>
  );
}

export default App;
