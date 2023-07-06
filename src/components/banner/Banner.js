import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Banner.module.css";
import illustration from "../../images/blog-illustration.avif";

const Banner = () => {
  const handleBlogNowClick = () => {
    window.open("/create", "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <Typography variant="h3" className={styles.mainText}>
          <b>Create Your First Blog Now</b>
        </Typography>
        <Typography variant="h6">
          Welcome to the world of blogging! Blogging is a powerful way to share
          your thoughts, ideas, expertise, and experiences with the world. It
          allows you to express yourself, connect with like-minded individuals,
          and even build a community around your passions.
        </Typography>
        <Button
          className={styles.btn}
          variant="contained"
          color="primary"
          onClick={handleBlogNowClick}
        >
          Blog Now
        </Button>
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={illustration}
          alt="Blogging Illustration"
        />
      </div>
    </div>
  );
};

export default Banner;
