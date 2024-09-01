import { useForm } from "react-hook-form";
import { signIn } from "../../lib/auth";
import { useGlobalContext } from "../../context/globalContext";
import { useLocalStorage } from "react-use";
import { Button, TextField } from "@mui/material";

export const Login = () => {
  const { globalContext, setGlobalContext } = useGlobalContext();
  const [value, setValue, remove] = useLocalStorage("admin", "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const user = await signIn(data.email, data.password);
      setGlobalContext((prev) => ({ ...prev, user }));
      setValue(user.uid);
      const idToken = await user.getIdToken();
      document.cookie = `token=${idToken}; path=/; secure; samesite=strict`;
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
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
        variant="outlined"
        sx={{ width: "100%", marginTop: "8px" }}
      >
        Sign In
      </Button>
    </form>
  );
};
