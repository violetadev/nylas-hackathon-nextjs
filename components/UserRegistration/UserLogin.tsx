import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../context/globalContext";
import { useLocalStorage } from "react-use";
import { Button, Snackbar, TextField } from "@mui/material";
import { getUserByEmailAndPasscode } from "../../lib/helpers";

export const UserLogin = ({ setStoredUser, storedUser }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setGlobalContext, globalContext } = useGlobalContext();
  const [isToastOpen, setIsToastOpen] = useState({
    isOpen: false,
    message: "",
  });

  useEffect(() => {
    if (storedUser) {
      setGlobalContext((prev) => ({ ...prev, user: storedUser }));
    }
  }, [storedUser, setGlobalContext]);

  const onSubmit = async (data) => {
    try {
      const user = await getUserByEmailAndPasscode(
        process.env.NEXT_PUBLIC_USER_ID,
        data.email,
        data.passcode
      );

      if (!user) {
        throw new Error("No User Found");
      }

      setGlobalContext((prev) => ({ ...prev, user }));
      setStoredUser(user);
    } catch (error) {
      setIsToastOpen({
        isOpen: true,
        message: `Error signing in: ${error}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Snackbar
          open={isToastOpen.isOpen}
          autoHideDuration={6000}
          aria-label={isToastOpen.message}
          onClose={() => setIsToastOpen({ isOpen: false, message: "" })}
          message={isToastOpen.message}
        />
        <TextField
          label="Email"
          {...register("email", {
            required: "Email is required",
          })}
          error={!!errors.password}
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
            required: "Your passcode is required",
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
        <Button
          type="submit"
          variant="outlined"
          sx={{ width: "100%", marginTop: "8px" }}
        >
          Sign In
        </Button>
      </div>
    </form>
  );
};
