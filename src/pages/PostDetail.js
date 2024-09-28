import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // API 요청으로 특정 게시물 가져오기
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the blog post!", error);
      });
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetail;
