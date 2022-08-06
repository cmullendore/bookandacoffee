import React, { useState } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Home, Profile, ReadBooks, SearchBooks, SavedBooks } from './pages'

import Navtabs from './components/Navtabs';
import { Router, Route } from 'react-router-dom';
import  { createBrowserHistory}  from 'history';

const customHistory = createBrowserHistory();

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
      switch (currentPage) {
        case 'Home':
          return <Home />
        case 'SearchBooks':
          return <SearchBooks />
        case 'SavedBooks':
          return <SavedBooks />
        case 'ReadBooks':
          return <ReadBooks />
        case 'Profile':
          return <Profile />
        default:
          return <Home />
      }
  };

  const handlePageChange = (page) => setCurrentPage(page);



  return (
    <ApolloProvider client={client}>
      <div>
        {/* We are passing the currentPage from state and the function to update it */}
        
        <Router history={customHistory}>
        <Route exact path="/">
        <Navtabs currentPage={currentPage} handlePageChange={handlePageChange} />
        {renderPage()}
        </Route>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
