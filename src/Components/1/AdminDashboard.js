import { useState, useRef, useEffect } from "react";
import Post from "./Post.js";

//fetches posts from api
export default function AdminDashboard() {
  const [posts, setPosts] = useState(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const publishedRef = useRef(null);

  async function getPosts() {
    const token = JSON.parse(localStorage.getItem("jwtToken")).token;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, // Add the JWT to the Authorization header
      },
    };
    try {
      let response = await fetch(`http://localhost:3000/posts`, requestOptions);
      if (!response.ok) {
        throw new Error("Request failed");
      }

      let posts = await response.json();
      console.log(`the posts content is : ${posts}`);
      setPosts(posts);

      // Process the data or perform other operations
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function createPost(e) {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("jwtToken")).token;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: contentRef.current.value,
          title: titleRef.current.value,
          published: publishedRef.current.value,
        }),
      };

      let response = await fetch(`http://localhost:3000/posts`, requestOptions);

      let post = await response.json();
      console.log(`the post is ${post}`);
      alert(JSON.stringify(post));
      console.log(`the resonse status is  : ${response.status}`);
      alert(response.status);

      if (response.ok) {
        alert("post created");
        setPosts((prev) => {
          const newArray = [...prev];
          newArray.push(post.post);
          return newArray;
        });
        console.log("post created ");
      } else {
        alert(`response not ok : ${response.statusTex}`);
        console.log("post not created");
      }
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>admin shasboard</h1>

      <div id="posts">
        {posts?.map((post, index) => (
          <Post post={post} index={index} getPosts={getPosts} />
        ))}
        <form action="" onSubmit={createPost}>
          <input name="title" ref={titleRef} placeholder="title" required />
          <input
            name="content"
            ref={contentRef}
            placeholder="content"
            required
          />
          <input type="checkbox" name="published" ref={publishedRef} />
          <button>Create post</button>
        </form>
      </div>
    </div>
  );
}
