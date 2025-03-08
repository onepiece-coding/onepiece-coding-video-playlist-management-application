import { useSelector } from "react-redux";
import VideoCard from "../components/VideoCard";

const Favorites = () => {
  const { favorites, allVideos } = useSelector((state) => state.videos);
  const favoriteVideos = allVideos.filter((video) =>
    favorites.includes(video.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">
        Vidéos Favorites
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
