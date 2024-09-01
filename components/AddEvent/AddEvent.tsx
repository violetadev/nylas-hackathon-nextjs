import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Portal,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { postEventsData } from "../../fetch/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { normalizeEventData } from "./helpers";
import { useGlobalContext } from "../../context/globalContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const AddEvent = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [isToastOpen, setIsToastOpen] = useState({
    isOpen: false,
    message: "",
  });
  const { register, handleSubmit, formState, reset, setValue } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postEventsData,
    onSuccess: (response) => {
      if (response.data) {
        queryClient.invalidateQueries({queryKey: ['calendar']});
        setIsToastOpen({
          isOpen: true,
          message: "The event has been added successfully",
        });
        reset();
        closeModal();
      }
    },
    onError: () => {
      setIsToastOpen({
        isOpen: true,
        message: "There has been an error adding the event.",
      });
    },
  });

  const onSubmit = (data: any) => {
    const body = normalizeEventData(data);
    mutation.mutate(body);
  };
  const { errors } = formState;
  const handleClose = () => closeModal();
  console.log(mutation.status, "mutation.status");
  return (
    <div>
      <div ref={setContainer}></div>
      <Snackbar
        open={isToastOpen.isOpen}
        autoHideDuration={6000}
        aria-label={isToastOpen.message}
        onClose={() => setIsToastOpen({ isOpen: false, message: "" })}
        message={isToastOpen.message}
      />
      <Portal container={container}>
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            <Typography variant="h1">Add Event</Typography>
            <div>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxWidth: 400,
                  margin: "12px auto",
                }}
              >
                <TextField
                  label="Event Title"
                  {...register("eventTitle", {
                    required: "Event title is required",
                  })}
                  error={!!errors.eventTitle}
                  InputLabelProps={{ shrink: true }}
                  helperText={errors.eventTitle?.message as string}
                  size="small"
                  rows={4}
                />
                <TextField
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  {...register("date", {
                    required: "Date is required",
                  })}
                  error={!!errors.date}
                  helperText={errors.date?.message as string}
                />
                <TextField
                  label="Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  {...register("time", {
                    required: "Time is required",
                  })}
                  error={!!errors.time}
                  helperText={errors.time?.message as string}
                />
                <TextField
                  label="Duration (in minutes)"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  type="number"
                  {...register("duration", {
                    required: "Duration is required",
                  })}
                  error={!!errors.duration}
                  helperText={errors.duration?.message as string}
                />
                <TextField
                  label="Event Description"
                  {...register("eventDescription", {
                    required: "Event description is required",
                  })}
                  error={!!errors.eventDescription}
                  InputLabelProps={{ shrink: true }}
                  helperText={errors.eventDescription?.message as string}
                  multiline
                  size="small"
                  rows={4}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button onClick={handleClose} variant="outlined">
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={mutation.status === "pending"}
                  >
                    {mutation.status === "pending" ? "Loading" : "Add Event"}
                  </Button>
                </Box>
              </Box>
            </div>
          </Box>
        </Modal>
      </Portal>
    </div>
  );
};
