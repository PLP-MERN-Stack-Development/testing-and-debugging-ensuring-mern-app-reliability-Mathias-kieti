
import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import CreatePostForm from './components/CreatePostForm';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1 data-testid="title">MERN Testing App</h1>
      {showForm ? (
        <CreatePostForm token="test-token" />
      ) : (
        <Button data-testid="create-post" onClick={() => setShowForm(true)}>
          Create post
        </Button>
      )}
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
