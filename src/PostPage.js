import React from "react";
import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            {/* <p className="postDate">{post.datetime}</p> */}
            <p className="postBody">
            <a  href={post.body} target="blank">Turnillo Link</a>
            </p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Bidmax</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Bidmax
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
