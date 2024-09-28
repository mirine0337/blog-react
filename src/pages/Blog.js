import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]); // 기존 포스트 목록 상태
  const [title, setTitle] = useState(''); // 새 글의 제목 상태
  const [content, setContent] = useState(''); // 새 글의 내용 상태

  // userId를 고정된 값으로 설정
  const userId = 1;

  // 기존 블로그 포스트 불러오기
  useEffect(() => {
    fetchPosts(); // 컴포넌트 마운트 시 게시물 목록 불러오기
  }, []);

  // API를 통해 포스트를 불러오는 함수
  const fetchPosts = () => {
    axios.get('http://localhost:8080/api/posts') // 실제 백엔드 API로 변경
      .then(response => {
        setPosts(response.data); // 응답 데이터를 상태로 저장
      })
      .catch(error => {
        console.error("There was an error fetching the blog posts!", error);
      });
  };

  // 글 작성 후 서버에 전송하는 함수
  const handleSubmit = (event) => {
    event.preventDefault();

    // 입력된 글 데이터를 서버로 POST 요청 전송
    const newPost = {
      title: title,       // 입력된 제목
      content: content,   // 입력된 내용
      userId: userId      // 고정된 userId 사용
    };

    axios.post('http://localhost:8080/api/posts', newPost) // 백엔드로 POST 요청 전송
      .then(response => {
        console.log('Post created:', response.data);
        setPosts([response.data, ...posts]); // 새로 작성된 포스트를 기존 목록에 추가
        setTitle(''); // 제목 입력 필드 초기화
        setContent(''); // 내용 입력 필드 초기화
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
            onChange={(e) => setTitle(e.target.value)} // 제목 상태 업데이트
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)} // 내용 상태 업데이트
            required
          />
        </div>
        <button type="submit">Submit</button> {/* 글 작성 버튼 */}
      </form>

      {/* 기존 블로그 포스트 목록 */}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`}>{post.title}</Link> {/* 포스트 제목 클릭 시 상세 페이지로 이동 */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
