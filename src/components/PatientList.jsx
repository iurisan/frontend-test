import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PatientItem from './PatientItem';
import styled from 'styled-components';
import { groupBy } from '../utils';

const PatientListContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
`;

const StyledType = styled.p`
  font-size: 18px;
  margin: 0;
  color: ${(props) => props.theme.text.secondary};
`;

const sortPatients = (a, b) => {
  const dateA = new Date(a.last_visit_date);
  const dateB = new Date(b.last_visit_date);
  return dateA - dateB || a.name.localeCompare(b.name);
};

const groupPatients = (patients) => {
  const sortedPatients = patients.filter((p) => !p.is_completed).toSorted(sortPatients);
  return groupBy(sortedPatients, 'type');
};

const PatientList = () => {
  const patients = useSelector((state) => state.app.patients);
  const groupedPatients = useMemo(() => groupPatients(patients), [patients]);
  return (
    <PatientListContainer>
      <h2>Patients:</h2>
      {groupedPatients &&
        Object.entries(groupedPatients)
          .sort()
          .map(([type, list]) => {
            return (
              <div key={type}>
                <StyledType>{type.toUpperCase()}</StyledType>
                {list.map((patient) => (
                  <PatientItem patient={patient} key={patient.name} />
                ))}
              </div>
            );
          })}
    </PatientListContainer>
  );
};

export default PatientList;
