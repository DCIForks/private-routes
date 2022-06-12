# Wrapping Private Routes

This repository demonstrates how to limit access to certain paths to logged-in users only. Any attempt to visit a private path will result in a redirect to the "/login" page.

**NOTE: There is no attempt to actually log users in. The `loggedIn` state is merely simulated by the state of checkbox.**

The key is to wrap protected paths in a React component that uses a Context object to check the `loggedIn` state, and to either redirect to the `/login` page or render the requested element component.

If you want to protect multiple paths with a single `<RequireLogin>` element, you can create a `<Routes>` element as the child of the `<RequireLogin>` element, and then add your separate protected paths inside that.

If your paths start with a different name (e.g. "private/" and "secret/", then you will need to wrap each path in its own `<RequireLogin>` parent element. See the `separate-paths` branch for a demonstration.