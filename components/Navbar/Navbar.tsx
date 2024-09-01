"use client";

import React, { useState } from "react";
import { AppBar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavbarDrawer } from "./NavbarItems";
import theme from "../../styles";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDrawer = () => setIsOpen((prev) => !prev);

  return (
    <AppBar position="static" sx={{ background: "none", boxShadow: "none" }}>
      <MenuIcon
        onClick={handleToggleDrawer}
        sx={{
          color: theme.palette.primary.main,
          cursor: "pointer",
          margin: "24px",
        }}
      />
      <NavbarDrawer open={isOpen} onClose={handleToggleDrawer} />
    </AppBar>
  );
};
