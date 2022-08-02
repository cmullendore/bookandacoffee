import React, { useState } from "react";
import { Card, CardGroup } from "react-bootstrap";

const ReviewList = () => {

	const [reviews] = useState([
		{
			user: 'Dev',
			book: 'Sapiens: A Brief History of Humankind',
			title: 'good social science book',
			content: 'This book had changed my life, the way I think, the way I precept the world. I think it should be an obligatory book for everyone on this planet.',
		},
		{
			user: 'Nick',
			book: 'The Witcher',
			title: 'great action',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
		},
		{
			user: 'Chris',
			book: 'Shadow Over Innsmouth',
			title: 'existenstial cosmic horror done right!',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
		},
		{
			user: 'Mike',
			book: 'Book',
			title: 'A review',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
		}
	]);
			
	return (
		<div className="flex-row">
			{reviews.map(review => (
				<Card className="my-3">
					<div className="card-header d-flex justify-content-between">
						<div className="card-subtitle fw-semibold">
							{review.book}
						</div>
						<div className="card-subtitle  ">
						-{review.user}
						</div>
					</div>
					<h3 className="card-title m-3 text-capitalize">
						"{review.title}"
					</h3>
					
					<p className="card-text mx-3 pb-2">
						{review.content}
					</p>
					
				</Card>
			))}
		</div>

	)
}


export default ReviewList;