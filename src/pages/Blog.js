import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 사용하여 페이지 이동 처리

const Blog = () => {
  const [title, setTitle] = useState('');  // 새 글의 제목 상태
  const [content, setContent] = useState('');  // 새 글의 내용 상태
  const navigate = useNavigate();  // 페이지 이동을 위한 navigate 함수

  // userId를 고정된 값으로 설정
  const userId = 1;

  // 글 작성 후 서버에 전송하는 함수
  const handleSubmit = (event) => {
    event.preventDefault();

    // 입력된 글 데이터를 서버로 POST 요청 전송
    const newPost = {
      title: title,       // 입력된 제목
      content: content,   // 입력된 내용
      userId: userId      // 고정된 userId 사용
    };

    axios.post('http://localhost:8080/api/posts', newPost)  // 백엔드로 POST 요청 전송
      .then(response => {
        console.log('Post created:', response.data);
        setTitle('');  // 제목 입력 필드 초기화
        setContent('');  // 내용 입력 필드 초기화
        alert('작성 완료되었습니다.');  // 작성 완료 알림
        navigate('/about');  // About 페이지로 이동
      })
      .catch(error => {
        console.error('There was an error creating the post!', error);
      });
  };

  return (
    <div>
      <h1>Blog</h1>

      {/* 글 작성 폼 */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}  // 제목 상태 업데이트
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}  // 내용 상태 업데이트
            required
          />
        </div>
        <button type="submit">Submit</button>  {/* 글 작성 버튼 */}
      </form>
    </div>
  );
};

export default Blog;
