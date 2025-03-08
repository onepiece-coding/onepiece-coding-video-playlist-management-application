import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/slices/videoSlice";

const VideoCard = ({ video }) => {
  const dispatch = useDispatch();
  const { favorites = [] } = useSelector((state) => state.videos);
  const videoInFavorites = favorites.includes(video.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <Link to={`/video/${video.id}`}>
        <img
          src={video.miniature}
          alt={video.titre}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link
            to={`/video/${video.id}`}
            className="text-lg font-semibold dark:text-white"
          >
            {video.titre}
          </Link>
          <button
            onClick={() => dispatch(toggleFavorite(video.id))}
            className="text-red-500 hover:text-red-600"
          >
            <HeartIcon
              className={`h-6 w-6 ${
                videoInFavorites ? "fill-red-500" : "fill-transparent"
              }`}
            />
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {video.auteur.prenom} {video.auteur.nom}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {video.duree}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
