import * as React from 'react';

type AppointmentCardActionProps = {
  handleClick: () => void;
  label: string;
}

export const AppointmentCardAction = ({ label, handleClick }: AppointmentCardActionProps) => {
  return (
    <div onClick={handleClick}>{label}</div>
  );
}