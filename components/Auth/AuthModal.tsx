import React, { useState } from "react";
import { Modal, Box, Button, Typography, Portal } from "@mui/material";
import { Login } from "./Login";
import { Signup } from "./Signup";

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

export const AuthModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [step, setStep] = useState<string>("login");

  const handleClose = () => closeModal();

  return (
    <div>
      <div ref={setContainer}></div>
      <Portal container={container}>
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="auth modal"
          aria-describedby="auth modal to sign up and log in"
        >
          <Box sx={style}>
            <div>
              {step === "login" && (
                <div>
                  <Login />{" "}
                  <Typography
                    variant="h4"
                    onClick={() => setStep("signup")}
                    aria-label="Switch to sign up form"
                  >
                    Sign up
                  </Typography>
                </div>
              )}
              {step === "signup" && <Signup />}
            </div>
            <Button
              onClick={handleClose}
              sx={{ mt: 2 }}
              variant="contained"
              aria-label="Close authentication modal"
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Portal>
    </div>
  );
};
