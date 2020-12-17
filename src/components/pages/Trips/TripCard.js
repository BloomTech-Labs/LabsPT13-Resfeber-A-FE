import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apiDelete, apiPut } from '../../../api';
import { Button, Card, CardBody, CardHeader, Form, Input } from 'reactstrap';

function TripCard(props) {
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();
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

  const toggleMode = () => {
    setEditMode(!editMode);
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  const changeName = event => {
    event.preventDefault();
    apiPut(props.authState, '/trips', {
      trip_id: props.id,
      trip_name: event.target.trip_name.value,
    }).then(response => {
      console.log(response.data[0]);
      props.updateTripName(response.data[0]);
      toggleMode();
    });
  };

  const goToManageTrips = () => {
    history.push('/createTrip');
  };

  return (
    <Card style={{ maxWidth: '15rem', minWidth: '15rem', margin: '0 .5rem' }}>
      {editMode ? (
        <Form onSubmit={changeName}>
          <Input name="trip_name" placeholder={props.trip_name}></Input>
        </Form>
      ) : (
        <CardHeader tag="h5" onClick={toggleMode}>
          {props.trip_name}
        </CardHeader>
      )}
      <CardBody onClick={disableEditMode}>
        <Button
          onClick={goToManageTrips}
          color="info"
          style={{ marginRight: '.5rem' }}
        >
          Manage Trip
        </Button>
        <Button onClick={deleteTrip}>Delete</Button>
      </CardBody>
    </Card>
  );
}

export default TripCard;
