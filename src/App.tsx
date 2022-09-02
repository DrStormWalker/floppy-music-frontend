import type { Component} from 'solid-js';
import Files from './Files';

const App: Component = () => {
  return (
    <>
      <div class="navbar bg-base-300">
        <div class="flex-1">
          <a class="link link-hover normal-case text-lg">SFCF Floppy Music</a>
        </div>
        <div class="flex-none">
          <div class="flex-none xl:hidden">
            <label for="files-drawer" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div class="navbar-end">
            <a class="btn">Logout</a>
          </div>
        </div>
      </div>
      <div class="drawer drawer-mobile drawer-end">
        <input id="files-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
        </div>
        <div class="drawer-side">
          <label for="files-drawer" class="drawer-overlay"></label>
          <div class="menu overflow-y-auto lg:w-2/5 w-full bg-base-100 text-base-content">
            <div class="flex flex-col h-full">
              <div class="p-4">
                <Files />
              </div>
              <div class="h-64 bg-neutral mt-auto">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
