import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BlogList.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { Box, Stack } from "@mui/material";
import URL from "../../constants/urls";

const BlogList = ({ blogs }) => {
  const navigate = useNavigate();
  const handleClick = (blogId) => {
    navigate(`${URL.BLOG}?id=${blogId}`);
  };
  return (
    <div>
      {blogs.length > 0 && <h2>Blogs</h2>}
      {blogs?.map((blog) => (
        <Card key={blog._id} className={styles.root}>
          <CardContent className={styles.flexContainer}>
            <Box className={styles.box}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" className={styles.title}>
                  {blog.title}
                </Typography>
                <Typography variant="caption" className={styles.date}>
                  {new Date(blog.createdAt).toLocaleString("default", {
                    day: "numeric",
                    month: "short",
                  })}
                </Typography>
              </Stack>

              <div className={styles.description}>{blog.description}</div>
              <Button
                variant="outlined"
                className={styles.button}
                onClick={() => handleClick(blog._id)}
              >
                Read More
              </Button>
            </Box>

            <CardMedia
              component="img"
              image={blog.image}
              alt={blog.title}
              className={styles.media}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogList;
