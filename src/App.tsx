import { Component, onMount } from 'solid-js';
import Panel from "./Panel";
import Login from "./Login";
import { Route, Routes } from '@solidjs/router';

const App: Component = () => {


  return (
    <div class="main-height">
      <Routes>
        <Route path="/" component={Panel} />
        <Route path="/login" component={Login} />
      </Routes>
    </div>
  );
};

export default App;
