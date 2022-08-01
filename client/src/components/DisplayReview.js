import React, { useState } from "react";
import { Card, CardGroup } from "react-bootstrap";

const DisplayReview = () => {

	const [reviews] = useState([
		{
			user: 'Dev',
			book: 'Sapiens',
			title: 'good social science',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
		},
		{
			user: 'Nick',
			book: 'The Witcher',
			title: 'great action',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
		},
		{
			user: 'Chris',
			book: 'Building exterior',
			title: 'commercial',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
		},
		{
			user: 'Mike',
			book: 'Restaurant table',
			title: 'commercial',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
		}
	]);

	return (
		<CardGroup>
			<Card>
				<Card.Body>
					<Card.Title>Book Title</Card.Title>
					<Card.Subtitle>Review Title</Card.Subtitle>
					<Card.Text>Review Content</Card.Text>
				</Card.Body>
				
			</Card>
		</CardGroup>

	)
}

export default DisplayReview;