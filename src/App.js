import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit'; // PostEdit 컴포넌트 추가
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<PostEdit />} /> {/* 수정 페이지 경로 추가 */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
