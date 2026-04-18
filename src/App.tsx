import { Routes, Route } from 'react-router-dom';
import { FinderLayout } from './components/layout/FinderLayout';
import { SectionProvider } from './context/SectionContext';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Featured } from './pages/Featured';
import { AboutMe } from './pages/AboutMe';
import { Product } from './pages/Product';
import { Visual } from './pages/Visual';
import { XometryCase } from './pages/XometryCase';
import { OneumCase } from './pages/OneumCase';
import { DimeCase } from './pages/DimeCase';
import { BlogPost } from './pages/BlogPost';

function App() {
  return (
    <ThemeProvider>
    <SectionProvider>
      <Routes>
        <Route path="/" element={<FinderLayout />}>
          <Route index element={<Home />} />
          <Route path="featured" element={<Featured />} />
          <Route path="about-me" element={<AboutMe />} />
          <Route path="product" element={<Product />} />
          <Route path="visual" element={<Visual />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="projects/xometry-workcenter" element={<XometryCase />} />
          <Route path="projects/oneum" element={<OneumCase />} />
          <Route path="projects/dime" element={<DimeCase />} />
        </Route>
      </Routes>
    </SectionProvider>
    </ThemeProvider>
  );
}

export default App;
