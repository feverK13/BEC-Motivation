import { Navigation } from "./components/Navigation";
import { AboutSection } from "./sections/AboutSection";
import { RoleSection } from "./sections/RoleSection";
import { SummarySection } from "./sections/SummarySection";
import { FooterSection } from "./sections/FooterSection";
import "./App.css";

const photos = [
  "/photos/photo_1.jpg",
  "/photos/photo_2.jpg",
  "/photos/photo_3.jpg",
  "/photos/photo_4.jpg",
  "/photos/photo_5.jpg",
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
