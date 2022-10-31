import { Dropdown } from "components/dropdown";
import MovieListDiscovery from "components/movie/MovieListDiscovery";
import { tmdbAPI } from "config/config";
import SidebarBookmarkHistory from "modules/SidebarBookmarkHistory";
import React from "react";

const BookmarkPage = () => {
  return (
    <div>
      <SidebarBookmarkHistory></SidebarBookmarkHistory>
      {/* <Dropdown
        className={`w-[200px] min-w-[135px] text-neutral-400  relative`}
      >
        <Dropdown.Select className="cursor-pointer">hihi</Dropdown.Select>
        <Dropdown.List className="w-auto">
          <Dropdown.Option className="px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral-600">
            hihi
          </Dropdown.Option>
        </Dropdown.List>
      </Dropdown> */}
      <MovieListDiscovery
        className="mt-5"
        category={tmdbAPI}
      ></MovieListDiscovery>
    </div>
  );
};

export default BookmarkPage;
