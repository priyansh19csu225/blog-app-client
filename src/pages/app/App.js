import "./App.css";
import { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import BlogList from "../../components/bloglist/BlogList";
import { Container } from "@mui/material";
import { getRequest } from "../../networkcalls/requests";
import API_URL from "../../constants/apiurl";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    getRequest(API_URL.FIND_ALL, { signal: controller.signal })
      .then((res) => {
        setBlogs(res.doc);
      })
      .catch((err) => console.log(err));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Container>
      <Banner />
      <main>
        <BlogList blogs={blogs} />
      </main>
    </Container>
  );
}

export default App;
