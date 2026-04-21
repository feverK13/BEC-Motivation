import { Navigation } from './components/Navigation';
import { AboutSection } from './sections/AboutSection';
import { RoleSection } from './sections/RoleSection';
import { SummarySection } from './sections/SummarySection';
import { FooterSection } from './sections/FooterSection';
import './App.css';

// Photo paths for the carousel
const photos = [
  '/photos/photo1.jpg',
  '/photos/photo2.jpg',
  '/photos/photo3.jpg',
  '/photos/photo4.jpg',
  '/photos/photo5.jpg',
];

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <AboutSection photos={photos} />
        <RoleSection />
        <SummarySection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
