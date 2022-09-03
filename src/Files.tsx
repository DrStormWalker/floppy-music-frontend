import type { Component} from 'solid-js';
import { For } from 'solid-js';

interface FilesProps {
  files?: string[],
  onPlay: (fileName: string) => void,
  onQueue: (fileName: string) => void,
  onDownload: (fileName: string) => void,
  onDelete: (fileName: string) => void,
}

const Files: Component<FilesProps> = (props: FilesProps) => {
  return (
    <div class="w-full">
      <table class="table table-compact table-zebra w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox checkbox-xs" />
              </label>
            </th>
            <th>File Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <For each={props.files}>
            { (file) =>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox checkbox-xs" />
                  </label>
                </th>
                <td>{ file }</td>
                <th>
                  <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-xs btn-square btn-ghost">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </label>
                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a onClick={ () => props.onPlay(file) }>Play</a></li>
                      <li><a onClick={ () => props.onQueue(file) }>Add to queue</a></li>
                      <li><a onClick={ () => props.onDownload(file) }>Download</a></li>
                      <li>
                        <a
                          onClick={ () => props.onDelete(file) }
                          class="btn btn-outline btn-error">
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            }
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default Files;
