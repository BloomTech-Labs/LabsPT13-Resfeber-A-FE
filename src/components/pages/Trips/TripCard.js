import React from 'react';
import { apiDelete } from '../../../api';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';

function TripCard(props) {
  const deleteTrip = event => {
    event.preventDefault();
    apiDelete(props.authState, '/trips', {
      trip_id: props.id,
    }).then(response => {
      if (response !== 0) {
        props.deleteTrip(props.id);
      }
    });
  };

  return (
    <Card style={{ maxWidth: '15rem' }}>
      <CardHeader tag="h5">{props.trip_name}</CardHeader>
      <CardBody>
        <Button color="info" style={{ marginRight: '.5rem' }}>
          Manage Trip
        </Button>
        <Button onClick={deleteTrip}>Delete</Button>
      </CardBody>
    </Card>
  );
}

export default TripCard;
