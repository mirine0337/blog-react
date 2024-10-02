import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // useNavigate 사용
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error("게시글을 불러오는 중 오류가 발생했습니다.", error);
      });
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  // 수정 버튼 클릭 시 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  // 삭제 버튼 클릭 시
  const handleDelete = () => {
    // 사용자에게 확인 메시지를 띄움
    const confirmed = window.confirm('삭제하시겠습니까?');
    
    if (confirmed) {
      // 사용자가 확인을 누른 경우, 삭제 요청
      axios.delete(`http://localhost:8080/api/posts/${id}`)
        .then(() => {
          navigate('/'); // 삭제 완료 후 홈으로 이동
        })
        .catch(error => {
          console.error("게시글 삭제 중 오류가 발생했습니다.", error);
        });
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {/* 수정 버튼 */}
      <button onClick={handleEdit}>글 수정</button>

      {/* 삭제 버튼 */}
      <button onClick={handleDelete}>글 삭제</button>

      {/* 뒤로가기 버튼 */}
      <Link to="/">뒤로가기</Link>
    </div>
  );
};

export default PostDetail;
