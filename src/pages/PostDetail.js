import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();  // 게시글 ID 가져오기
  const [post, setPost] = useState(null);  // 게시글 상태
  const [comments, setComments] = useState([]);  // 댓글 상태
  const [newComment, setNewComment] = useState('');  // 새로운 댓글 상태
  const navigate = useNavigate();  // 페이지 이동을 위한 navigate 함수

  // 게시글 및 댓글 불러오기
  useEffect(() => {
    // 게시글 불러오기
    axios.get(`http://localhost:8080/api/posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error("게시글을 불러오는 중 오류가 발생했습니다.", error);
      });

    // 해당 게시글의 댓글 불러오기
    axios.get(`http://localhost:8080/api/posts/${id}/comments`)
      .then(response => {
        setComments(response.data);  // 가져온 댓글 데이터를 상태에 저장
      })
      .catch(error => {
        console.error("댓글을 불러오는 중 오류가 발생했습니다.", error);
      });
  }, [id]);

  // 게시글 수정 함수
  const handleEdit = () => {
    navigate(`/edit/${id}`);  // 게시글 수정 페이지로 이동
  };

  // 게시글 삭제 함수
  const handleDelete = () => {
    const confirmed = window.confirm('삭제하시겠습니까?');  // 사용자에게 확인 메시지 띄움

    if (confirmed) {
      axios.delete(`http://localhost:8080/api/posts/${id}`)
        .then(() => {
          navigate('/');  // 삭제 후 홈으로 이동
        })
        .catch(error => {
          console.error("게시글 삭제 중 오류가 발생했습니다.", error);
        });
    }
  };

  // 댓글 작성 함수
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const newCommentData = {
      content: newComment,
      userId: 1  // 사용자 ID는 고정값으로 사용하거나 로그인한 사용자 정보로 대체 가능
    };

    // 새로운 댓글을 서버에 전송
    axios.post(`http://localhost:8080/api/posts/${id}/comments`, newCommentData, {
      headers: {
        'Content-Type': 'application/json',  // JSON 형식으로 전송
      },
    })
    .then(response => {
      setComments([...comments, response.data]);  // 댓글 목록에 새 댓글 추가
      setNewComment('');  // 댓글 입력 필드 초기화
    })
    .catch(error => {
      console.error("댓글 작성 중 오류가 발생했습니다.", error);
    });
  };

  if (!post) return <div>로딩 중...</div>;

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

      {/* 댓글 작성 폼 */}
      <h2>댓글</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 작성하세요..."
          required
        />
        <button type="submit">댓글 작성</button>
      </form>

      {/* 댓글 목록 */}
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <small>{comment.created_at}</small>
            {/* 추가로 답글 기능이 필요하다면 여기에 답글 버튼 추가 */}
            <button onClick={() => alert('답글 기능은 이후 구현 예정')}>답글</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;
