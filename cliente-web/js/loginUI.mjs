/**
 * Displays a content panel specified by the given element id.
 * All the panels that participate in this flow should have the 'page' class applied,
 * so that it can be correctly hidden before the requested content is shown.
 * @param {*} id The id of the content to show
 */
const showContent = (id) => {
    eachElement(".page", (p) => p.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  };
  
  /**
   * Updates the user interface
   */
  const updateLoginUI = async () => {
    try {
      const isAuthenticated = await window.auth0Client.isAuthenticated();
  
      if (isAuthenticated) {
        const user = await auth0Client.getUser();
  
        document.getElementById("profile-data").innerText = JSON.stringify(
          user,
          null,
          2
        );
  
        document.querySelectorAll("pre code").forEach(hljs.highlightBlock);
  
        eachElement(".profile-image", (e) => (e.src = user.picture));
        eachElement(".user-name", (e) => (e.innerText = user.name));
        eachElement(".user-email", (e) => (e.innerText = user.email));
        eachElement(".auth-invisible", (e) => e.classList.add("hidden"));
        eachElement(".auth-visible", (e) => e.classList.remove("hidden"));
      } else {
        eachElement(".auth-invisible", (e) => e.classList.remove("hidden"));
        eachElement(".auth-visible", (e) => e.classList.add("hidden"));
      }
    } catch (err) {
      console.log("Error updating UI!", err);
      return;
    }
  
    console.log("UI updated");
  };
  
  window.onpopstate = (e) => {
    if (e.state && e.state.url && router[e.state.url]) {
      showContentFromUrl(e.state.url);
    }
  };
  window.updateLoginUI = updateLoginUI;
  window.showContent = showContent;