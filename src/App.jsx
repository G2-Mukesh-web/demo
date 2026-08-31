import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';

// Page Views
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import Team from './pages/Team';
import Journal from './pages/Journal';
import JournalDetail from './pages/JournalDetail';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* 1. Home */}
            <Route index element={<Home />} />

            {/* 2. Studio / About */}
            <Route path="about" element={<About />} />
            <Route path="studio" element={<Navigate to="/about" replace />} />

            {/* 3. Projects Grid & 4. Project Detail */}
            <Route path="projects" element={<Projects />} />
            <Route path="portfolio" element={<Navigate to="/projects" replace />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />

            {/* 5. Services */}
            <Route path="services" element={<Services />} />

            {/* 6. Team */}
            <Route path="team" element={<Team />} />

            {/* 7. Journal / News & 8. Journal Detail */}
            <Route path="journal" element={<Journal />} />
            <Route path="news" element={<Navigate to="/journal" replace />} />
            <Route path="journal/:slug" element={<JournalDetail />} />

            {/* 9. Careers */}
            <Route path="careers" element={<Careers />} />

            {/* 10. Contact / Enquiry */}
            <Route path="contact" element={<Contact />} />
            <Route path="enquire" element={<Navigate to="/contact" replace />} />

            {/* 11. 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
