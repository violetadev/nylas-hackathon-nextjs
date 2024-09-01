import { useForm } from "react-hook-form";
import { signUp } from "../../lib/auth";
import { addUserData, registerParticipant } from "../../lib/helpers";
import { useGlobalContext } from "../../context/globalContext";
import { useLocalStorage } from "react-use";
import { Button, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "../../fetch/helpers";

export const UserSignup = () => {
  const queryClient = useQueryClient();
  const [isToastOpen, setIsToastOpen] = useState({
    isOpen: false,
    message: "",
  });
  const { setGlobalContext } = useGlobalContext();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: createContact,
    onSuccess: async (data) => {
      console.log(data, "nylasContact");
      const user = await registerParticipant(process.env.NEXT_PUBLIC_USER_ID, {
        passcode: getValues("passcode"),
        ...data.data,
        // nylasContactId: nylasContact.id,
      });
      console.log(user, "signup");
      setGlobalContext((prev) => ({ ...prev, user }));

      setIsToastOpen({
        isOpen: true,
        message: "You have been registered!",
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const nylasContact = mutation.mutate({
        ...data,
      });
      // console.log(nylasContact, "nylasContact");
      // const user = await registerParticipant(process.env.NEXT_PUBLIC_USER_ID, {
      //   ...data,
      //   // nylasContactId: nylasContact.id,
      // });
      // console.log(user, "signup");
      // setGlobalContext((prev) => ({ ...prev, user }));

      // setIsToastOpen({
      //   isOpen: true,
      //   message: "You have been registered!",
      // });
    } catch (error) {
      console.error("Error signing up:", error);
      setIsToastOpen({
        isOpen: true,
        message: "There has been an error.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Snackbar
        open={isToastOpen.isOpen}
        autoHideDuration={6000}
        aria-label={isToastOpen.message}
        onClose={() => setIsToastOpen({ isOpen: false, message: "" })}
        message={isToastOpen.message}
      />
      <div>
        <TextField
          label="Name"
          {...register("givenName", {
            required: "Your name is required",
          })}
          error={!!errors.givenName}
          InputLabelProps={{ shrink: true }}
          helperText={errors.givenName?.message as string}
          size="small"
          sx={{ margin: "12px 0", width: "100%" }}
        />
        {errors.givenName && <p>{errors.givenName.message as string}</p>}
      </div>
      <div>
        <TextField
          label="Last Name"
          {...register("surname", {
            required: "Your last name is required",
          })}
          error={!!errors.surname}
          InputLabelProps={{ shrink: true }}
          helperText={errors.surname?.message as string}
          size="small"
          sx={{ margin: "12px 0", width: "100%" }}
        />
        {errors.surname && <p>{errors?.surname?.message as string}</p>}
      </div>
      <div>
        <TextField
          label="Email"
          {...register("email", {
            required: "Email is required",
          })}
          error={!!errors.email}
          InputLabelProps={{ shrink: true }}
          helperText={errors.email?.message as string}
          size="small"
          sx={{ margin: "12px 0", width: "100%" }}
        />
        {errors.email && <p>{errors.email.message as string}</p>}
      </div>
      <div>
        <TextField
          type="text"
          label="Passcode"
          {...register("passcode", {
            required: "Passcode is required",
            validate: (value) => {
              if (value.length !== 4) {
                return "Passcode must be exactly 4 digits";
              }
              if (!/^\d{4}$/.test(value)) {
                return "Passcode must be numeric";
              }
              return true;
            },
          })}
          error={!!errors.passcode}
          InputLabelProps={{ shrink: true }}
          helperText={errors.passcode?.message as string}
          size="small"
          sx={{ margin: "12px 0", width: "100%" }}
        />
        {errors.passcode && <p>{errors.passcode.message as string}</p>}
      </div>
      <div>
        <TextField
          label="Share 5 fun facts about yourself"
          {...register("notes", {
            required: "The fun facts are required",
          })}
          error={!!errors.notes}
          InputLabelProps={{ shrink: true }}
          helperText={errors.notes?.message as string}
          size="small"
          sx={{ margin: "12px 0", width: "100%" }}
        />
        {errors.notes && <p>{errors.notes.message as string}</p>}
      </div>
      <Button
        type="submit"
        variant="contained"
        sx={{ width: "100%", marginTop: "8px" }}
      >
        Sign Up
      </Button>
    </form>
  );
};
