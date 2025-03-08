import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setSelectedPlaylist,
} from "../store/slices/videoSlice";
import { playlists } from "../data";

const SearchAndFilter = () => {
  const dispatch = useDispatch();
  const { selectedPlaylist, searchQuery } = useSelector(
    (state) => state.videos
  );

  const [search, setSearch] = useState(searchQuery || "");
  const [selected, setSelected] = useState(selectedPlaylist || "");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };

  const handleFilter = (e) => {
    setSelected(e.target.value);
    dispatch(setSelectedPlaylist(e.target.value || null));
  };

  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Rechercher des vidéos..."
        value={search}
        onChange={handleSearch}
        className="flex-1 p-2 rounded-lg border dark:text-white dark:bg-gray-700 dark:border-gray-600"
      />

      <select
        value={selected}
        onChange={handleFilter}
        className="p-2 rounded-lg border dark:text-white dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="">Toutes les playlists</option>
        {playlists.map((playlist) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.titre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndFilter;
