import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import AlumniProfiles from './pages/AlumniProfiles';
import AlumniProfile from './pages/AlumniProfile';
import BusinessDetail from './pages/BusinessDetail';
import Announcements from './pages/Announcements';
import AnnouncementDetail from './pages/AnnouncementDetail';
import Contact from './pages/Contact';
import Bylaws from './pages/Bylaws';
import BoardOfDirectors from './pages/BoardOfDirectors';
import MemberRegistration from './pages/MemberRegistration';
import AdvertisementGallery from './pages/AdvertisementGallery';
import AlumniActivities from './pages/AlumniActivities';
import ClubActivities from './pages/ClubActivities';
import Donations from './pages/Donations';
import LegalNotice from './pages/LegalNotice';
import AlumniTopics from './pages/AlumniTopics';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/alumni-profiles" element={<AlumniProfiles />} />
          <Route path="/alumni-profiles/:id" element={<AlumniProfile />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/announcements/:id" element={<AnnouncementDetail />} />
          <Route path="/alumni-topics" element={<AlumniTopics />} />
          <Route path="/advertisement-gallery" element={<AdvertisementGallery />} />
          <Route path="/alumni-activities" element={<AlumniActivities />} />
          <Route path="/club-activities" element={<ClubActivities />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/legal" element={<LegalNotice />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bylaws" element={<Bylaws />} />
          <Route path="/board-of-directors" element={<BoardOfDirectors />} />
          <Route path="/member-registration" element={<MemberRegistration />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
