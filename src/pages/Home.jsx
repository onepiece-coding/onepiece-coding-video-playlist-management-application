import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyFilters, setCurrentPage } from "../store/slices/videoSlice";
import SearchAndFilter from "../components/SearchAndFilter";
import VideoCard from "../components/VideoCard";
import Pagination from "../components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const {
    filteredVideos,
    currentPage,
    videosPerPage,
    searchQuery,
    selectedPlaylist,
  } = useSelector((state) => state.videos);

  // Calculate paginated videos
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  // Apply filters whenever search or playlist changes
  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch, searchQuery, selectedPlaylist]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchAndFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredVideos.length}
        itemsPerPage={videosPerPage}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
};

export default Home;
