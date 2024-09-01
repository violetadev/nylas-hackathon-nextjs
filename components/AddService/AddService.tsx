import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Portal,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebase.config";
import { useLocalStorage } from "react-use";
import { useForm } from "react-hook-form";

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

export const AddService = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [value, setValue, remove] = useLocalStorage<any>("admin", "");

  const onSubmit = async (data: any) => {
    try {
      if (!value) {
        return;
      }

      await addDoc(collection(db, "users", value.uid, "services"), {
        title: data.title,
        duration: data.duration,
        serviceDescription: data.serviceDescription,
        notes: data.notes,
        createdAt: new Date(),
        userId: value,
      });
      reset();
      closeModal();
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleClose = () => closeModal();

  return (
    <div>
      <div ref={setContainer}></div>
      <Portal container={container}>
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            <Typography variant="h1">Add a service</Typography>
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
                  label="Title"
                  {...register("title", { required: "Title is required" })}
                  error={!!errors.title}
                  helperText={errors.title?.message as string}
                />
                <TextField
                  label="Duration (in minutes)"
                  type="number"
                  {...register("duration", {
                    required: "Duration is required",
                    valueAsNumber: true,
                  })}
                  error={!!errors.duration}
                  helperText={errors.duration?.message as string}
                />
                <TextField
                  label="Service Description"
                  {...register("serviceDescription", {
                    required: "Service description is required",
                  })}
                  error={!!errors.serviceDescription}
                  helperText={errors.serviceDescription?.message as string}
                  multiline
                  rows={4}
                />
                <TextField
                  label="Notes"
                  {...register("notes")}
                  multiline
                  rows={2}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button onClick={handleClose} variant="outlined">
                    Close
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Add Service
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
