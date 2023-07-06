import React, { useEffect, useState } from "react";
import {
  Button,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./ShowBlog.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import CreateBlog from "../../components/createblog/CreateBlog";
import API_URL from "../../constants/apiurl";
import { deleteRequest, getRequest } from "../../networkcalls/requests";
import URL from "../../constants/urls";

const ShowBlog = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const blogId = searchParams.get("id");
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!blogId) return;
    const controller = new AbortController();

    getRequest(`${API_URL.FIND_ONE}?id=${blogId}`, {
      signal: controller.signal,
    })
      .then((res) => {
        setBlog(res.doc);
        console.log(res.doc);
      })
      .catch((err) => console.log(err));
    return () => {
      controller.abort();
    };
  }, [blogId]);

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(0);

  const handleDelete = () => {
    setAction(2);
    setOpen(true);
  };

  const handleEdit = () => {
    setAction(1);
    setOpen(true);
  };

  const confirmDelete = () => {
    deleteRequest(`${API_URL.DELETE}?id=${blogId}`)
      .then((res) => {
        console.log(res.doc);
        setOpen(false);
        navigate(URL.HOME);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <div className={styles.root}>
        <div className={styles.header}>
          <div>
            <Typography variant="h6" component="p">
              {blog?.createdAt && new Date(blog?.createdAt).toLocaleString()}
            </Typography>
          </div>
          <div>
            <Tooltip title="Update Blog">
              <IconButton
                aria-label="update"
                color="primary"
                onClick={handleEdit}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Blog">
              <IconButton
                aria-label="delete"
                color="error"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={styles.title}>
          <Typography variant="h3" component="h1">
            {blog?.title}
          </Typography>
        </div>
        <div className={styles.image}>
          <CardMedia
            component="img"
            image={blog?.image}
            alt={blog?.title}
            className={styles.media}
          />
        </div>
        <div className={styles.description}>
          <Typography variant="body" component="p">
            {blog?.description}
          </Typography>
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {action === 1 && (
          <DialogContent>
            <CreateBlog blog={blog} setOpen={setOpen} setBlog={setBlog} />
          </DialogContent>
        )}
        {action === 2 && (
          <>
            <DialogContent>
              Are you sure you want to delete this blog post?
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={confirmDelete}>
                Yes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ShowBlog;
