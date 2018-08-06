
import playlistControls from "./yt1210Controls";
import playlistManager from "./yt1210PlaylistManager";

const pm = new playlistManager();

const yt1210State = {
  playlistControls: new playlistControls(pm),
  playlistManager: pm
};

export default yt1210State;
