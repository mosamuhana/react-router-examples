import './App.scss';
import '@reach/dialog/styles.css';

import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import { ImageDialog, Layout, NoMatch } from './components';
import HomePage from './pages/Home';
import GalleryPage from './pages/Gallery';
import ImageViewPage from './pages/ImageView';

export default function App() {
  const location = useLocation();

  // The `backgroundLocation` state is the location that we were at when one of
  // the gallery links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the gallery in the background, behind the modal.
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  return (
    <div>
      <h1>Modal Example</h1>

      <p>
        This is an example of how to create a contextual modal navigation with
        React Router where the navigation path the user takes determines if the
        page is rendered in the modal or not (popularized by pinterest,
        instagram, and others in the 2010s). This type of modal is typically
        used as a kind of "detail" view to focus on a particular object in a
        collection (like a pinterest board) while not taking you completely out
        of context of the parent page. But, when the same URL is visited
        directly (rather than from the collection page) it renders as it's own
        full page instead of in a modal.
      </p>

      <p>
        In this example, notice how the URL updates when the modal opens (if you
        are viewing the example in StackBlitz you may need to open in a new
        browser window). Even though the URL is updated to the specific item in
        the modal, the background page is still showing behind it.
      </p>

      <p>
        Next, copy and paste the URL to a new browser tab and notice that it
        shows that specific item not in a modal, but directly on the page. This
        is the view that someone would see if they clicked on a link that you
        sent them when you had the modal open. They don't have the context you
        did when you opened the modal, so they don't see it in the context of
        the background page.
      </p>

      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="/images/:id" element={<ImageViewPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>

      {/* Show the modal when a `backgroundLocation` is set */}
      {backgroundLocation && (
        <Routes>
          <Route path="/images/:id" element={<ImageDialog />} />
        </Routes>
      )}
    </div>
  );
}
