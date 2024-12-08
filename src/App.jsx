import { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route correctly
import Navbar from './components/Navbar/navbar'; // Import the Navbar component

const Gallery = lazy(() => import("./components/Gallery/gallery"));
const MidSection = lazy(() => import("./components/MidSection/midsection"));
const MidSection1 = lazy(() => import("./components/MidSection1/midsection-1"));
const LastSection = lazy(() => import("./components/LastSection/lastsection"));
const Footer = lazy(() => import("./components/Footer/footer"));
const AllPhotos = lazy(() => import('./components/Allphotos/allphotos')); // Lazy load AllPhotos component

function App() {
  return (
    <div className="App">
      <Router> {/* Wrapping the app with Router for routing */}
        <Suspense
          fallback={
            <div
              className="loading"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="loader"></div>
            </div>
          }
        >
          <Navbar />
          {/* Define routes here */}
          <Routes>
            <Route path="/all-photos" element={<AllPhotos />} />
            <Route path="/" element={<><MidSection /><MidSection1 /><Gallery /><LastSection /></>} />
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
