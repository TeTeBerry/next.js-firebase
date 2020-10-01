import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button, List, notification } from "antd";
import fire from "../config/fire-config";
import CreatePost from "../components/CreatePost";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  useEffect(() => {
    fire
      .firestore()
      .collection("blog")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  }, []);
  console.log(blogs);
  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        notification.success({
          message: "Logged out!",
        });
      });
  };

  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Blog</h1>
      {!loggedIn ? (
        <div>
          <Link href="/users/register">
            <a>Register</a>
          </Link>{" "}
          |
          <Link href="/users/login">
            <a> Login</a>
          </Link>
        </div>
      ) : (
        <Button onClick={handleLogout}>Logout</Button>
      )}
      <List
        itemLayout="horizontal"
        dataSource={blogs}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link href="/blog/[id]" as={"/blog/" + item.id}>
                  <a href="https://ant.design">{item.title}</a>
                </Link>
              }
              description={item.content}
            />
          </List.Item>
        )}
      />
      ,
      <CreatePost />
    </div>
  );
};
export default Home;
