import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../utils';
import { Card } from './common/Card';

const PatientContainer = styled(Card)`
  margin: 15px auto;
  padding: 20px;
  color: ${(props) => props.theme.text.secondary};
`;

const ItemLine = styled.div`
  margin: 5px 0;
`;

const PatientItem = ({ patient }) => {
  return (
    <PatientContainer>
      <ItemLine>Name: {patient.name}</ItemLine>
      <ItemLine>Joined: {formatDate(patient.joined)}</ItemLine>
      <ItemLine>Last visit: {formatDate(patient.last_visit_date)}</ItemLine>
      <ItemLine>Completed: {patient.is_completed ? 'Yes' : 'No'}</ItemLine>
    </PatientContainer>
  );
};

export default PatientItem;
