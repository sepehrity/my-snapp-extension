function injectScript(file_path: string, tag: string) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file_path);
  node.appendChild(script);
}
injectScript(chrome.runtime.getURL("assets/getAccessToken.js"), "body");

window.addEventListener(
  "PassAccessToken",
  (evt) => {
    chrome.storage.local.set({ accessToken: (evt as any).detail });
  },
  false
);
