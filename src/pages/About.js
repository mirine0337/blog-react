import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate 사용
import NotificationIcon from './NotificationIcon.png';  // 종 모양의 알림 아이콘 이미지

const About = () => {
  const [posts, setPosts] = useState([]);  // 포스트 상태 저장
  const [notifications, setNotifications] = useState([]);  // 알림 상태
  const [showNotifications, setShowNotifications] = useState(false);  // 알림 팝업 상태
  const navigate = useNavigate();  // 페이지 이동을 위한 navigate 함수

  const userId = 1;  // 임시 사용자 ID. 로그인 기능이 없다면 고정값을 사용

  // 포스트 데이터를 불러오는 함수
  useEffect(() => {
    axios.get('http://localhost:8080/api/posts')  // 백엔드 API에서 포스트 목록 불러오기
      .then(response => {
        setPosts(response.data);  // 가져온 데이터를 상태에 저장
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });

    // 알림 데이터를 불러오는 함수
    axios.get(`http://localhost:8080/api/notifications/${userId}`)
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error("Error fetching notifications:", error);
      });
  }, [userId]);

  // 알림 아이콘을 클릭하면 팝업 표시
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);  // 팝업 표시 상태 토글
  };

  // 알림 읽음 처리 함수
  const handleMarkAsRead = (notificationId, postId) => {
    axios.put(`http://localhost:8080/api/notifications/${notificationId}/read`)
      .then(() => {
        setNotifications(notifications.map(n => 
          n.id === notificationId ? { ...n, isRead: true } : n
        ));

        // postId가 있는 경우에만 해당 포스트로 이동
        if (postId) {
          navigate(`/blog/${postId}`);  // 해당 포스트로 이동
        } else {
          console.error("Post ID is missing, can't navigate to post.");
        }
      })
      .catch(error => {
        console.error("Error updating notification:", error);
      });
  };

  // 체크 버튼을 클릭하면 해당 글의 PostDetail로 이동
  const handleCheckClick = (id) => {
    navigate(`/blog/${id}`);  // 해당 id의 PostDetail 페이지로 이동
  };

  return (
    <div>
      <h1>About Me</h1>
      <p>This is the about page where I introduce myself.</p>

      {/* 알림 아이콘 및 팝업 */}
      <div>
        <img 
          src={NotificationIcon} 
          alt="Notifications" 
          onClick={handleNotificationClick} 
          style={{ cursor: 'pointer', width: '30px' }} 
        />
        {showNotifications && (
          <div style={{
            position: 'absolute',
            right: '20px',
            top: '50px',
            border: '1px solid black',
            padding: '10px',
            backgroundColor: 'white',
            zIndex: 1000,
            width: '300px'
          }}>
            <h3>Notifications</h3>
            <ul>
              {notifications.length === 0 ? (
                <li>No notifications</li>
              ) : (
                notifications.map(notification => (
                  <li key={notification.id} style={{ 
                    backgroundColor: notification.isRead ? 'lightgray' : 'white',
                    padding: '10px',
                    marginBottom: '5px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleMarkAsRead(notification.id, notification.postId)}
                  >
                    {notification.message}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

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
