let auth0Client = null;

const fetchAuthConfig = () => fetch("./auth-config.json");

const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();

    console.log(config);
    
    auth0Client = await auth0.createAuth0Client({
        domain: config.domain,
        clientId: config.clientId
    });
};

const updateUI = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    const loginHash = ["", "#login"];
    console.log(window.location.hash);

    if (isAuthenticated && loginHash.includes(window.location.hash)) {
        console.log("User is authenticated");
        window.location.hash = "admin";
    } else if (!loginHash.includes(window.location.hash) && !isAuthenticated) {
        console.log("User is not authenticated");
        window.location.hash = "login";
    } else {
        console.log("User is not authenticated");
    }
  
    const loginButton = document.getElementById("btn-login");
    const logoutButton = document.getElementById("btn-logout");

    logoutButton && (logoutButton.disabled = !isAuthenticated);
    loginButton && (loginButton.disabled = isAuthenticated);
};

window.onload = async () => {
    await configureClient();

    const query = window.location.search;
    const shouldParseResult = query.includes("code=") && query.includes("state=");
  
    if (shouldParseResult) {
      console.log("> Parsing redirect");
      try {
        const result = await auth0Client.handleRedirectCallback();
  
        if (result.appState && result.appState.targetUrl) {
          showContentFromUrl(result.appState.targetUrl);
        }
  
        console.log("Logged in!");
      } catch (err) {
        console.log("Error parsing redirect:", err);
      }
  
      window.history.replaceState({}, document.title, "/");
    }

    updateUI();
};

window.onhashchange = () => {
    updateUI();
};

const login = async () => {
    try {
        const completeUrl = window.location.origin + window.location.pathname;
        console.log("Logging in", completeUrl);
    
        const options = {
          authorizationParams: {
            redirect_uri: completeUrl
          }
        };
    
        await auth0Client.loginWithRedirect(options);
    } catch (err) {
        console.log("Log in failed", err);
    }
};

const logout = async () => {
    try {
        console.log("Logging out");
        await auth0Client.logout({
          logoutParams: {
            returnTo: window.location.origin
          }
        });
    } catch (err) {
        console.log("Log out failed", err);
    }
};

window.login = login;
window.logout = logout;