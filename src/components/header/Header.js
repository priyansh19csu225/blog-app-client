import React from "react";
import PagesIcon from "@mui/icons-material/Pages";
import { Stack, Container } from "@mui/material";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <Stack direction="row">
          <PagesIcon fontSize="large" />
          <strong>The Blogosphere</strong>
        </Stack>
      </Container>
    </header>
  );
}

export default Header;
