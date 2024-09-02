import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Button, DialogContent } from "@mui/material";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../lib/firebase.config";
import { AuthModal } from "../Auth/AuthModal";
import { useLocalStorage } from "react-use";

type NavbarDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const navigationLinks = [
  { label: "Home", to: "/admin" },
  { label: "Events", to: "/admin/events" },
  { label: "Participants", to: "/admin/participants" },
  { label: "Event", to: "/event" },
];

export const NavbarDrawer: React.FC<NavbarDrawerProps> = ({
  open,
  onClose,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [value, setValue, remove] = useLocalStorage("admin", "");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      remove();
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      onClose();
    }
  };

  const handleRedirect = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{ role: "navigation", "aria-label": "Navigation Drawer" }}
    >
      <DialogContent
        sx={{
          background: "#03070a",
          width: "20vw",
          display: "flex",
          flexFlow: "column wrap",
          gap: 1.5,
          p: 0,
          pb: 2,
        }}
      >
        {navigationLinks.map((item) => (
          <Button
            key={item.label}
            onClick={() => handleRedirect(item.to)}
            variant="text"
            aria-label={`Navigate to ${item.label}`}
          >
            {item.label}
          </Button>
        ))}
      </DialogContent>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 1.5,
          background: "#03070a",
          pb: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          mb: 0,
          justifyContent: "center",
        }}
      >
        {user ? (
          <Button variant="outlined" aria-label="Logout" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
              aria-label="Login or Sign Up"
            >
              Login/Sign Up
            </Button>
            <AuthModal isOpen={isOpen} closeModal={handleCloseModal} />
          </>
        )}
      </Box>
    </Drawer>
  );
};
