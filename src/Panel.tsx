import { Component, createSignal, createEffect, onMount } from "solid-js";
import Files from './Files';
import Controls from "./Controls";
import Navbar from "./Navbar";

const API_V1_ROOT = "/api/v1"
const API_V1_FILES = `${API_V1_ROOT}/files`;
const API_V1_FILE = `${API_V1_ROOT}/file`;
const API_V1_PLAY = `${API_V1_ROOT}/play`;
const API_V1_PLAYING = `${API_V1_ROOT}/playing`;
const API_V1_EVENTS_PANEL = `${API_V1_ROOT}/events/panel`;
const API_V1_EVENTS_LOGS = `${API_V1_ROOT}/events/logs`;
const API_V1_STATUS = `${API_V1_ROOT}/status`;
const API_V1_RESUME = `${API_V1_ROOT}/resume`;
const API_V1_PAUSE = `${API_V1_ROOT}/pause`;
const API_V1_STOP = `${API_V1_ROOT}/stop`;
const API_V1_PLAY_MSG = `${API_V1_ROOT}/play/msg`

const Panel: Component = () => {
  const [ playing, setPlaying ] = createSignal(false);
  const [ menuShown, setMenuShown ] = createSignal(false);
  
  const [ files, setFiles ] = createSignal([ ]);

  const [ filePlaying, setFilePlaying ] = createSignal(files()[0]);
  
  const [ error, setError ] = createSignal("");
  
  onMount(() => {
    function fetchFiles() {     
      fetch(API_V1_FILES)
        .then(response => response.json())
        .then(json => {
          setFiles(json);
        })
        .catch(e => {
          console.log(e);
        });
    }
    
    function fetchPlaying() {
      fetch(API_V1_PLAYING)
        .then(response => response.json())
        .then(json => {
          console.log(`Now playing: ${json?.current}`);
          setFilePlaying(json?.current);
        })
        .catch(e => {
          console.log(e);
        });
    }
    
    function fetchStatus() {
      fetch(API_V1_STATUS)
        .then(response => response.json())
        .then(json => {
          console.log(`Current status: ${json.status}`);
          switch (json.status) {
            case "running":
              setPlaying(true);
              break;
            case "stopped":
            case "paused":
              setPlaying(false);
              break;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
    
    fetchFiles();
    fetchPlaying();
    fetchStatus();
    
    window.addEventListener("focus", () => {
      fetchFiles();
      fetchPlaying();
      fetchStatus();
    }, false);
    
    if (navigator.requestMIDIAccess === undefined) {
      console.log("MIDI access not available");
    } else {
      navigator.requestMIDIAccess()
        .then(access => {
          for (const entry of access.inputs) {
            const input = entry[1];
            console.log(`Input port [type:'${input.type}']` +
              ` id:'${input.id}'` +
              ` manufacturer:'${input.manufacturer}'` +
              ` name:'${input.name}'` +
              ` version:'${input.version}'`);
          }
          
          access.inputs.forEach(entry => entry.onmidimessage = event => {
            console.log(event.data);
            fetch(API_V1_PLAY_MSG, {
              method: "POST",
              body: event.data,
            })
              .catch(e => {
                console.log(e);
              })
          })
        }, err => {
          console.log(err);
        });
    }
      
    let panelEvents = new EventSource(API_V1_EVENTS_PANEL);
    
    panelEvents.onmessage = function(event) {
      let data = JSON.parse(event.data);
      
      switch (data.path) {
        case "playing":
          fetchPlaying();
          break;
        case "files":
          fetchFiles();
          break;
        case "status":
          fetchStatus();
          break;
      }
    };
    
    panelEvents.onerror = function(err) {
      setError(err);
      console.log(err);
    };
    
    let logEvents = new EventSource(API_V1_EVENTS_LOGS);
    
    logEvents.onmessage = function(event) {
      let data = event.data;
      
      console.log(data);
    }
    
    logEvents.onerror = function(event) {
      setError(err);
      console.log(err);
    }
  });
  
  function playFile(filename: string) {
    fetch(`${API_V1_PLAY}/${filename}`)
      .catch(e => {
        console.log(e);
      })
  }
  
  function downloadFile(filename: string) {
    const anchor = document.createElement("a");
    
    anchor.href = `${API_V1_FILE}/${filename}`;
    anchor.download = filename;
    
    document.body.appendChild(anchor);
    
    anchor.click();
    
    document.body.removeChild(anchor);
  }
  
  function resumePlaying() {
    fetch(API_V1_RESUME)
      .catch(e => {
        console.log(e);
      })
  }

  function pausePlaying() {
    fetch(API_V1_PAUSE)
      .catch(e => {
        console.log(e);
      })
  }
  
  function stopPlaying() {
    fetch(API_V1_STOP)
      .catch(e => {
        console.log(e);
      })
  }
  
  return (
    <div class="flex flex-col h-full">
      <div class="flex-none">
        <Navbar
          menuShown={ menuShown() }
          onMenuToggle={ () => setMenuShown(menuShown => !menuShown) }
        />
      </div>
      <div class="grow drawer drawer-mobile drawer-end lg:!auto-cols-max-auto h-0">
        <input id="files-drawer" type="checkbox" class="drawer-toggle" checked={ menuShown() } />
        <div class="drawer-content flex flex-col">
        </div>
        <div class="drawer-side h-full">
          <label for="files-drawer" class="drawer-overlay"></label>
          <div class="menu lg:w-2/5 w-full bg-base-100 text-base-content">
            <div class="flex flex-col h-full">
              <div class="p-4 grow h-0">
                <Files
                  files={ files() }
                  onPlay={ file => playFile(file) }
                  onQueue={ () => {} }
                  onDownload={ file => downloadFile(file) }
                  onDelete={ () => {} }
                />
              </div>
              <div class="flex-none md:h-48 h-32 bg-neutral mt-auto lg:rounded-tl-lg lg:rounded-t-none rounded-t-lg z-50">
                <Controls
                  file={ filePlaying() }
                  playing={ playing() }
                  onPlayPause={ () => playing() ? pausePlaying() : resumePlaying() }
                  onStop={ () => stopPlaying() }
                  onForward={ () => {} }
                  onBackward={ () => {} }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
