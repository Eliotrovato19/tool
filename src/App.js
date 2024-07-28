import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import PostPage from "./PostPage";
import Ideas from "./ideas/Ideas";
import NewPost from "./NewPost";
import About from "./About";
import EditPost from "./EditPost";
import Missing from "./Missing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/posts";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const { data, fetchError, isLoading } = useAxiosFetch(
    "https://florentine-spiny-humor.glitchh.me/posts"
  );
  // const { data, fetchError, isLoading } = useAxiosFetch(
  //   "https://bidmax.free.beeceptor.com/posts"
  // );
  useEffect(() => {
    setPosts(data);
  }, [data]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       console.log(response.data);
  //       //console.log(response.status);
  //       //console.log(response.statusText);
  //       //console.log(response.config.baseURL);
  //       //console.log(response.request);
  //       //console.log(response.headers);
  //       setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         // Not in the 200 response range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      window.history.go(-1);
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = new Date().toLocaleString();
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      window.history.go(-2);
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = new Date().toLocaleString();
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      window.history.back();
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <Header title={window.location.pathname} />
      <Router>
        <Nav />
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="about" element={<About />} />
          <Route path="ideas" element={<Ideas />} />
          <Route
            exact
            path="/post"
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                setPostBody={setPostBody}
                postBody={postBody}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditPost
                posts={posts}
                handleEdit={handleEdit}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                setEditBody={setEditBody}
                editBody={editBody}
              />
            }
          />
          <Route
            exact
            path="/"
            element={
              <Home
                posts={posts}
                fetchError={fetchError}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/post/:id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />

          <Route path="*" element={<Missing />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
