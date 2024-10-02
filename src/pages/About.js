import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate 사용

const About = () => {
  const [posts, setPosts] = useState([]);  // 포스트 상태 저장
  const navigate = useNavigate();  // 페이지 이동을 위한 navigate 함수

  // 포스트 데이터를 불러오는 함수
  useEffect(() => {
    axios.get('http://localhost:8080/api/posts')  // 백엔드 API에서 포스트 목록 불러오기
      .then(response => {
        setPosts(response.data);  // 가져온 데이터를 상태에 저장
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // 체크 버튼을 클릭하면 해당 글의 PostDetail로 이동
  const handleCheckClick = (id) => {
    navigate(`/blog/${id}`);  // 해당 id의 PostDetail 페이지로 이동
  };

  return (
    <div>
      <h1>About Me</h1>
      <p>This is the about page where I introduce myself.</p>

      <h2>Post List</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {/* 체크 버튼 추가 */}
            <button onClick={() => handleCheckClick(post.id)}>✔</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
