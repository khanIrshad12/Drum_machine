import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
const firstSoundsGroup = [
  {
    keyCode: 81,
    key: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    key: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    key: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    key: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    key: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    key: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    key: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    key: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];
const secondSoundsGroup = [
  {
    keyCode: 81,
    key: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    key: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    key: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    key: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    key: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    key: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    key: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    key: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];
const soundName = {
  heaterkit: "Heater Kits...",
  smoothPianoKit: "Smooth Piano Kit"
};
const soundGroup = {
  heaterkit: firstSoundsGroup,
  smoothPianoKit: secondSoundsGroup
};

const KeyBoardKey = ({ play, sound: { id, key, url, keyCode } }) => {
  let HandleEvent = (e) => {
    if (e.keyCode === keyCode) {
      play(key, id);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", HandleEvent);
  }, []);

  return (
    <button id={keyCode} className="drum-pd" onClick={() => play(key, id)}>
      <audio src={url} id={key} />
      {key}
    </button>
  );
};
const KeyBoard = ({ Power, play, sounds }) => (
  <div className="keybord">
    {Power
      ? sounds.map((sound) => <KeyBoardKey sound={sound} play={play} />)
      : sounds.map((sound) => (
          <KeyBoardKey sound={{ ...sound, url: "#" }} play={play} />
        ))}
  </div>
);
const DrumControl = ({
  handlePower,
  Power,
  name,
  volume,
  handleVolumeChange,
  ChangeGroupsound
}) => {
  return (
    <div className="control">
      <button onClick={handlePower}>Turn Power: {Power ? "Off" : "On"}</button>

      <h2>Volume: {Math.round(volume * 100)}%</h2>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      <h2 className="display">{name}</h2>
      <br />
      <button onClick={ChangeGroupsound}>ChangeGroupsound</button>
    </div>
  );
};

function App() {
  const [volume, setVolumechange] = useState(1);
  const [power, setPower] = useState(true);
  const [soundsName, setSoundsName] = useState("");
  const [soundType, setSoundType] = useState("heaterkit");
  const [sounds, setSound] = useState(soundGroup[soundType]);

  function handleVolumeChange(event) {
    setVolumechange(event.target.value);
    console.log(volume);
  }

  const setKeyVolume = () => {
    let audios = sounds.map((music) => document.getElementById(music.key));
    console.log(volume);
    audios.forEach((kick) => {
      if (kick) {
        kick.volume = parseFloat(volume);
      }
    });
  };

  function Styleactivity(buaudio) {
    buaudio.parentElement.style.backgroundColor = "#000";
    buaudio.parentElement.style.color = "#fff";
  }
  function DeacctivateStyle(buaudio) {
    setTimeout(() => {
      buaudio.parentElement.style.backgroundColor = "#fff";
      buaudio.parentElement.style.color = "#000";
    }, 300);
  }
  const play = (key, soundheadname) => {
    setSoundsName(soundheadname);
    let audio = document.getElementById(key);
    Styleactivity(audio);
    audio.currentTime = 0;
    audio.play();
    DeacctivateStyle(audio);
  };

  const ChangeGroupsound = () => {
    setSoundsName("");
    if (soundType === "heaterkit") {
      setSoundType("smoothPianoKit");
      setSound(soundGroup.smoothPianoKit);
    } else {
      setSoundType("heaterkit");
      setSound(soundGroup.heaterkit);
    }
  };
  function handlePower() {
    setPower(!power);
  }

  return (
    <div id="drum-machine">
      {setKeyVolume()}
      <div className="wrapper">
        <KeyBoard Power={power} play={play} sounds={sounds} />

        <DrumControl
          handlePower={handlePower}
          Power={power}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          name={soundsName || soundName[soundType]}
          ChangeGroupsound={ChangeGroupsound}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <div>
    <App />
  </div>
);
