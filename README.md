# Wrapping Private Routes

This repository demonstrates how to limit access to certain paths to logged-in users only. Any attempt to visit a private path will result in a redirect to the "/login" page.

**NOTE: There is no attempt to actually log users in. The `loggedIn` state is merely simulated by the state of checkbox.**

The key is to wrap protected paths in a React component that uses a Context object to check the `loggedIn` state, and to either redirect to the `/login` page or render the requested element component.

If you have different paths that need to be protected, each path must have its own `<RequireLogin>` parent element.