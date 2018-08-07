import { Howl } from "howler";

import ogg_crackle from "../sounds/crackle.ogg";
import ogg_stylus from "../sounds/stylus.ogg";
import ogg_scratchin from "../sounds/scratchin.ogg";
import ogg_drag from "../sounds/drag.ogg";

class sounds {
  ogg_stylus = new Howl({
    src: [ogg_stylus],
    loop: false,
    autoplay: false,
    autoload: true
  });
  ogg_crackle = new Howl({
    src: [ogg_crackle],
    loop: true,
    autoplay: false,
    autoload: true
  });
  ogg_drag = new Howl({
    src: [ogg_drag],
    loop: false,
    autoplay: false,
    autoload: true,
    volume: 0.05
  });
  ogg_scratchin = new Howl({
    src: [ogg_scratchin],
    loop: false,
    autoplay: false,
    autoload: true,
    volume: 0.5
  });
}

const yt1210Sounds = new sounds();

export default yt1210Sounds;
