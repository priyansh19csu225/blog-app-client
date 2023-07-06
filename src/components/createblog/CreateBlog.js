import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { postRequest, putRequest } from "../../networkcalls/requests";
import API_URL from "../../constants/apiurl";

const BlogInputForm = ({ blog, setOpen, setBlog }) => {
  const [title, setTitle] = useState(blog?.title || "");
  const [image, setImage] = useState(blog?.image || "");
  const [description, setDescription] = useState(blog?.description || "");

  const [errors, setErrors] = useState({
    title: false,
    image: false,
    description: false,
  });

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setErrors({ ...errors, title: false });
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
    setErrors({ ...errors, image: false });
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setErrors({ ...errors, description: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formIsValid = true;

    if (title.trim() === "") {
      setErrors((errors) => {
        return { ...errors, title: true };
      });
      formIsValid = false;
    }

    if (image.trim() === "") {
      setErrors((errors) => {
        return { ...errors, image: true };
      });
      formIsValid = false;
    }

    if (description.trim() === "") {
      setErrors((errors) => {
        return { ...errors, description: true };
      });
      formIsValid = false;
    }

    if (!formIsValid) {
      console.log(errors);
      return;
    }

    if (blog) {
      await putRequest(API_URL.UPDATE, {
        id: blog._id,
        title,
        description,
        image,
      })
        .then(() => {
          setBlog((blog) => {
            return { ...blog, title, image, description };
          });
          setTitle("");
          setImage("");
          setDescription("");
          setErrors({ title: false, image: false, description: false });
        })
        .catch((err) => {});
      setOpen(false);
      return;
    }

    postRequest(API_URL.CREATE, { title, description, image })
      .then(() => {
        setTitle("");
        setImage("");
        setDescription("");
        setErrors({ title: false, image: false, description: false });
      })
      .catch((err) => {});
  };

  return (
    <Container>
      <h2>
        <center>{blog ? "Update Blog" : "Create Blog"}</center>
      </h2>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
          error={errors.title}
          helperText={errors.title && "Title is required"}
        />

        <TextField
          label="Image URL"
          variant="outlined"
          value={image}
          onChange={handleImageChange}
          fullWidth
          margin="normal"
          error={errors.image}
          helperText={errors.image && "Image URL is required"}
          type="url"
        />

        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
          margin="normal"
          error={errors.description}
          helperText={errors.description && "Description is required"}
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default BlogInputForm;
