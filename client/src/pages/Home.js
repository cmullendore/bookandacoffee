import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';

import { useQuery } from '@apollo/client';
import { QUERY_BOOKREVIEWS, QUERY_BOOKREVIEWSCOUNT } from '../utils/queries';

import BookReview from '../components/BookReview';

const Home = () => {

  const [skip, setSkip] = useState(0);

  const [reviews, setReviews] = useState();
  const [reviewsCount, setReviewsCount] = useState(0);

  let reviewsCountQuery = useQuery(QUERY_BOOKREVIEWSCOUNT);

  let reviewsQuery = useQuery(QUERY_BOOKREVIEWS, {
    variables: { ...{skip: skip, limit: 10} },
  });



useEffect(() => {
  if (!reviewsQuery.loading && reviewsQuery.data) {
    
    setReviews(reviewsQuery.data.bookReviews);
  }
}, [reviewsQuery.data]);

useEffect(() => {

  if (!reviewsCountQuery.loading && reviewsCountQuery.data) {
    
    setReviewsCount(reviewsCountQuery.data.bookReviewsCount);

  }
}, [reviewsCountQuery.loading]);


if (reviewsQuery.loading) {
  return <h2>LOADING...</h2>;
}
if (reviewsQuery.data && !reviews)
{
  return <h2>CONFIGURING...</h2>;
}

  return (
    <>
      {skip >= 10 ?
      <Container className="d-grid gap-2">
      <Button variant='secondary' size='lg' onClick={() => setSkip(skip - 10)}>
        Load Previews Reviews...
      </Button>
      </Container>
      : ""
      }
      {reviews.map((review) => {
        return (
          <BookReview className="" key={review._id} review={review} />
        )
      })}
      {reviewsCount > skip + 10 ?
      <Container className="d-grid gap-2">
      <Button variant='secondary' size='lg' onClick={() => setSkip(skip + 10)}>
        Load more reviews...
      </Button>
      </Container>
      : ""
      }
    </>



  );
};

export default Home;
