import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/slices/videoSlice";

const SidebarVideoCard = ({ video, isActive = false }) => {
  const dispatch = useDispatch();
  const { favorites = [] } = useSelector((state) => state.videos);
  const videoInFavorites = favorites.includes(video.id);

  return (
    <div
      className={`group flex gap-4 p-2 rounded-lg ${
        isActive
          ? "bg-blue-100 dark:bg-gray-700 border-2 border-blue-500"
          : "hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      <div className="flex-shrink-0 relative">
        <Link
          to={`/video/${video.id}`}
          className={isActive ? "pointer-events-none" : ""}
        >
          <img
            src={video.miniature}
            alt={video.titre}
            className="w-32 h-20 rounded-md object-cover"
          />
          <span className="absolute bottom-1 right-1 text-xs bg-black/80 text-white px-1 rounded">
            {video.duree}
          </span>
        </Link>
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`text-sm font-medium truncate ${
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-900 dark:text-gray-100"
          }`}
        >
          <Link
            to={`/video/${video.id}`}
            className={isActive ? "pointer-events-none" : ""}
          >
            {video.titre}
          </Link>
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {video.auteur.prenom} {video.auteur.nom}
        </p>
        {!isActive && (
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
        )}
      </div>
    </div>
  );
};

export default SidebarVideoCard;
