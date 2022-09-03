import type { Component } from "solid-js";

const Login: Component = () => {
  return (
    <div class="p-2 flex justify-center items-center h-full bg-neutral">
      <form
        class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        method="post"
        action="/api/v1/login"
      >
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              class="input input-bordered"
              name="email"
              type="email"
              placeholder="email"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              class="input input-bordered"
              name="password"
              type="password"
              placeholder="password"
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
