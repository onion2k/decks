import { configure, decorate, observable, action, autorun } from "mobx";

import playlistControls from "./yt1210Controls";
import playlistManager from "./yt1210PlaylistManager";

configure({ enforceActions: true });

const yt1210State = {
  playlistControls: new playlistControls(),
  playlistManager: new playlistManager()
};

export default yt1210State;
