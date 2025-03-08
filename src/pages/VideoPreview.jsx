import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { playlists } from "../data";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { dislikeVideo, likeVideo } from "../store/slices/videoSlice";
import CommentSection from "../components/CommentSection";
import SidebarVideoCard from "../components/SidebarVideoCard";

const VideoPreview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentVideo = useSelector((state) =>
    state.videos.allVideos.find((video) => video.id === id)
  );

  const playlistVideos = playlists.find((p) =>
    p.videos.some((v) => v.id === id)
  )?.videos;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width={"100%"}
              height={460}
              src={currentVideo.lien}
              title={currentVideo.titre}
              allowFullScreen
              className="rounded-lg"
            />
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold dark:text-white">
              {currentVideo.titre}
            </h1>
            <div className="flex flex-center space-x-4 mt-2">
              <span className="text-gray-600 dark:text-gray-300">
                {currentVideo.auteur.prenom} {currentVideo.auteur.nom}
              </span>
              <div className="flex space-x-2">
                <button
                  className={`flex items-center ${
                    currentVideo.likes <= 0
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-blue-500"
                  }`}
                  onClick={() => dispatch(likeVideo(currentVideo.id))}
                  disabled={currentVideo.likes > 0}
                >
                  <HandThumbUpIcon className="h-5 w-5 mr-1" />
                  {currentVideo.likes}
                </button>
                <button
                  className={`flex items-center ${
                    currentVideo.dislikes <= 0
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-red-500"
                  }`}
                  onClick={() => dispatch(dislikeVideo(currentVideo.id))}
                  disabled={currentVideo.dislikes > 0}
                >
                  <HandThumbDownIcon className="h-5 w-5 mr-1" />
                  {currentVideo.dislikes}
                </button>
              </div>
            </div>

            <CommentSection videoId={currentVideo.id} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-white">
            Autres vidéos de la playlist
          </h2>
          {playlistVideos.map((video) => (
            <SidebarVideoCard
              key={video.id}
              video={video}
              isActive={video.id === currentVideo.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
