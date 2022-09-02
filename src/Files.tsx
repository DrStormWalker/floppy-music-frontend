import type { Component} from 'solid-js';
import { For } from 'solid-js';

const Files: Component = () => {
  const files = ["Test File.mid", "Super Mario Bros.mid"];
  
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
          <For each={files}>
            { (file, i) =>
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
                      <li><a>Play</a></li>
                      <li><a>Add to queue</a></li>
                      <li><a>Download</a></li>
                      <li><a class="btn btn-outline btn-error">Delete</a></li>
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
