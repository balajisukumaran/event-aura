import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProfileCard = () => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="profile-picture.jpg" alt="Profile Picture" />
      <Card.Body>
        <Card.Title>FirstName LastName</Card.Title>
        <Card.Text>
          100 Followers | 50 Following
        </Card.Text>
        <Button variant="primary">Follow</Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
