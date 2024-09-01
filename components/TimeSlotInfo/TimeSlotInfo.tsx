import { IconButton, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type TimeInfo = {
  timeslot: string;
  handleClick?: () => void;
}

export const TimeSlotInfo = ({ timeslot, handleClick }: TimeInfo) => {

  return (
    <div onClick={handleClick}>
      <IconButton size='medium'><AccessTimeIcon /></IconButton>
      <Typography variant="body1">Timeslot</Typography>
      <Typography variant="body1">{timeslot}</Typography>
    </div>
  )
}
