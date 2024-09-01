import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { transformDateRange, transformTimeslot } from "../../helpers/helpers";
import { deleteEvent, editEvent } from "../../fetch/helpers";

export const getActions = (eventId, queryClient) => [
  {
    fn: async () => {
      await deleteEvent(eventId);
      queryClient.invalidateQueries(["calendar"]);
    },
    label: "Delete",
    icon: (
      <IconButton size="medium">
        <DeleteIcon />
      </IconButton>
    ),
  },
  // {
  //   fn: async () => {
  //     await editEvent(eventId);
  //     queryClient.invalidateQueries(["calendar"]);
  //   },
  //   label: "Edit",
  //   icon: (
  //     <IconButton size="medium">
  //       <EditIcon />
  //     </IconButton>
  //   ),
  // },
];

export const formatEventsData = (events, queryClient) => {
  return events?.map((event) => ({
    date:
      event.when.object === "datespan"
        ? transformDateRange(event.when.start_date, event.when.end_date)
        : transformTimeslot(
            event.when.start_time,
            event.when.end_time,
            event.when.start_timezone
          ),
    title: event.title,
    description: event.description,
    id: event.id,
    participantsCount: event.participants.length.toString(),
    actions: getActions(event.id, queryClient),
  }));
};
