import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 사용
import axios from 'axios';

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate 사용
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => {
        console.error("게시글을 불러오는 중 오류가 발생했습니다.", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedPost = {
      title: title,
      content: content
    };

    axios.put(`http://localhost:8080/api/posts/${id}`, updatedPost)
      .then(() => {
        navigate('/'); // 수정 완료 후 홈으로 이동
      })
      .catch(error => {
        console.error("게시글 수정 중 오류가 발생했습니다.", error);
      });
  };

  return (
    <div>
      <h1>글 수정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
};

export default PostEdit;
