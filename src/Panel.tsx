import { Component, createSignal, createEffect } from "solid-js";
import Files from './Files';
import Controls from "./Controls";
import Navbar from "./Navbar";

const Panel: Component = () => {
  const [ playing, setPlaying ] = createSignal(false);
  const [ menuShown, setMenuShown ] = createSignal(false);
  
  const [ files, setFiles ] = createSignal([
    "Test file.mid",
    "Test file2.mid",
    "Super mario.mid",
  ])

  const [ filePlaying, setFilePlaying ] = createSignal(files()[0]);
  
  return (
    <div class="flex flex-col h-full">
      <div class="flex-none">
        <Navbar
          menuShown={ menuShown() }
          onMenuToggle={ () => setMenuShown(menuShown => !menuShown) }
        />
      </div>
      <div class="grow drawer drawer-mobile drawer-end lg:!auto-cols-max-auto h-auto">
        <input id="files-drawer" type="checkbox" class="drawer-toggle" checked={ menuShown() } />
        <div class="drawer-content flex flex-col">
        </div>
        <div class="drawer-side h-full">
          <label for="files-drawer" class="drawer-overlay"></label>
          <div class="menu lg:w-2/5 w-full bg-base-100 text-base-content">
            <div class="flex flex-col h-full">
              <div class="p-4">
                <Files
                  files={ files() }
                  onPlay={ file => setFilePlaying(file) }
                  onQueue={ () => {} }
                  onDownload={ () => {} }
                  onDelete={ () => {} }
                />
              </div>
              <div class="md:h-48 h-32 bg-neutral mt-auto lg:rounded-tl-lg lg:rounded-t-none rounded-t-lg">
                <Controls
                  file={ filePlaying() }
                  playing={ playing() }
                  onPlayPause={ () => setPlaying(playing => !playing) }
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
