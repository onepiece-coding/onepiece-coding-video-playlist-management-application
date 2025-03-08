import { createSlice } from "@reduxjs/toolkit";
import { playlists } from "../../data";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

const allVideos = playlists.flatMap((playlist) => playlist.videos);

const initialState = {
  allVideos,
  filteredVideos: allVideos,
  favorites: [], // includes id's of favorites videos
  currentPage: 1,
  videosPerPage: 6,
  searchQuery: "",
  selectedPlaylist: null,
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    applyFilters: (state) => {
      let filtered = [...state.allVideos];

      // Apply search filter
      if (state.searchQuery) {
        filtered = filtered.filter((video) => {
          return video.titre
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase());
        });
      }

      // Apply playlist filter
      if (state.selectedPlaylist) {
        filtered = playlists.find(
          (playlist) => playlist.id === +state.selectedPlaylist
        ).videos;
      }

      state.filteredVideos = filtered;
      state.currentPage = 1; // Reset to first page when filters change
    },

    toggleFavorite: (state, action) => {
      // action.payload => videoId
      const index = state.favorites.indexOf(action.payload);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
    },

    likeVideo: (state, action) => {
      const video = state.allVideos.find(
        (video) => video.id === action.payload
      );
      if (video) {
        // If the video is already disliked, remove the dislike
        if (video.dislikes > 0) {
          video.dislikes -= 1;
        }

        // Increment likes
        video.likes += 1;
      }
    },

    dislikeVideo: (state, action) => {
      const video = state.allVideos.find(
        (video) => video.id === action.payload
      );
      if (video) {
        // If the video is already liked, remove the like
        if (video.likes > 0) {
          video.likes -= 1;
        }

        // Increment dislikes
        video.dislikes += 1;
      }
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    setSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
  },
});

// Nested persist configuration for the video slice
const videoPersistConfig = {
  key: "videos",
  storage, // Use localstorage
  whitelist: ["favorites"], // Only persist this field
};

// Create the persisted video reducer
const persistedVideoReducer = persistReducer(
  videoPersistConfig,
  videoSlice.reducer
);

export const {
  applyFilters,
  toggleFavorite,
  setCurrentPage,
  setSearchQuery,
  setSelectedPlaylist,
  likeVideo,
  dislikeVideo,
} = videoSlice.actions;

export default persistedVideoReducer;
