import { Component, Show } from "solid-js";

interface ControlsProps {
  file?: string,
  playing: boolean,
  onPlayPause: () => void,
  onForward: () => void,
  onBackward: () => void,
}

const Controls: Component<ControlsProps> = (props: ControlsProps) => {
  return (
    <div class="flex justify-center items-center flex-col gap-6 h-full">
      <div class="text-center whitespace-pre">
        { props.file ?? " " }
      </div>
      <div class="flex justify-center items-center gap-4">
        <button onClick={ () => props.onBackward() }>
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/sg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z"
            />
          </svg>
        </button>

        <label>
          <input
            class="hidden"
            type="checkbox"
            checked={ props.playing }
            onChange={ () => props.onPlayPause() }
          />
          <Show
            when={ props.playing && props.file }
            fallback={
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd" 
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                clip-rule="evenodd"
              />
            </svg>
          </Show>
        </label>

        <button onClick={ () => props.onForward() }>
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Controls;
