import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

import Auth from '../utils/auth';

import { QUERY_BOOKREVIEWS } from '../utils/queries';

const BookReview = ({ review }) => {

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">

                    <Col md="auto">
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{review.book.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{review.book.authors}</Card.Subtitle>
                        <Card.Text>
                        <a href={review.book.link} target='_blank' rel='noopener noreferrer'>
                            {review.book.image ? <img src={review.book.image} alt={`The cover for ${review.book.title}`} variant='top' /> : null}
                        </a>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                        <h2>{review.title}</h2>
                        <p>{review.content}</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default BookReview;