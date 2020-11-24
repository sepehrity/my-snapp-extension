const setIcon = (tabId: number) => {
  let hasAccessToken = false;
  chrome.storage.local.get("accessToken", ({ accessToken }) => {
    chrome.tabs.query(
      {
        lastFocusedWindow: true,
        active: true,
      },
      () => {
        hasAccessToken = !!accessToken;
      }
    );
    chrome.tabs.get(tabId, () => {
      if (hasAccessToken) {
        chrome.browserAction.setIcon({
          path: "assets/icon.png",
          tabId,
        });
        return;
      } else {
        chrome.browserAction.setIcon({
          path: "assets/disabled.png",
          tabId,
        });
        return;
      }
    });
  });
};

chrome.tabs.onActivated.addListener(({ tabId }) => {
  setIcon(tabId);
});

chrome.tabs.onUpdated.addListener(function (tabId, _change, tab) {
  if (tab.url === undefined) {
    return;
  } else if (tab.url.includes("https://app.snapp.taxi")) {
    setIcon(tabId);
  } else {
    setIcon(tabId);
  }
});
