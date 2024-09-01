import { useForm } from "react-hook-form";
import { signUp } from "../../lib/auth";
import { addUserData } from "../../lib/helpers";
import { useGlobalContext } from "../../context/globalContext";
import { useLocalStorage } from "react-use";
import { Button, TextField } from "@mui/material";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { globalContext, setGlobalContext } = useGlobalContext();
  const [value, setValue, remove] = useLocalStorage("admin", "");

  const onSubmit = async (data) => {
    try {
      const user = await signUp(data.email, data.password);
      await addUserData(user.uid, { email: data.email, createdAt: new Date() });
      setGlobalContext((prev) => ({ ...prev, user }));
      setValue(user.uid);
      const idToken = await user.getIdToken();
      document.cookie = `token=${idToken}; path=/; secure; samesite=strict`;
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          label="Full Name"
          {...register("name", {
            required: "Your name is required",
          })}
          error={!!errors.name}
          InputLabelProps={{ shrink: true }}
          helperText={errors.name?.message as string}
          size="small"
          sx={{ margin: "12px 0", width: "100%" }}
        />
        {errors.name && <p>{errors.name.message as string}</p>}
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
          type="password"
          label="Password"
          {...register("password", {
            required: "Password is required",
          })}
          error={!!errors.password}
          InputLabelProps={{ shrink: true }}
          helperText={errors.password?.message as string}
          size="small"
          sx={{ margin: "12px 0", width: "100%" }}
        />
        {errors.password && <p>{errors.password.message as string}</p>}
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
