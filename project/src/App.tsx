import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { featureFlags } from './config/environment';

const GalleryPlaceholder: React.FC = () => (
  <div className="mx-auto max-w-3xl px-4 py-16">
    <div className="rounded-3xl bg-white p-10 text-center shadow-xl ring-1 ring-blue-50">
      <h1 className="text-2xl font-bold text-gray-900">ギャラリーは準備中です</h1>
      <p className="mt-3 text-gray-600">公開までしばらくお待ちください。</p>
      <p className="mt-2 text-xs text-gray-400">開発環境では引き続き確認できます。</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/gallery"
            element={featureFlags.galleryEnabled ? <Gallery /> : <GalleryPlaceholder />}
          />
          <Route path="/alumni-profiles" element={<AlumniProfiles />} />
          <Route path="/alumni-profiles/:id" element={<AlumniProfile />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/announcements/:id" element={<AnnouncementDetail />} />
          <Route path="/alumni-topics" element={<AlumniTopics />} />
          {featureFlags.advertisementGalleryEnabled ? (
            <Route path="/advertisement-gallery" element={<AdvertisementGallery />} />
          ) : (
            <Route path="/advertisement-gallery" element={<Navigate to="/" replace />} />
          )}
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
