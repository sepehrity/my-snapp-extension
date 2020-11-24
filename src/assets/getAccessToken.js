if (
  window.location.href.includes("https://app.snapp.taxi/") &&
  window.localStorage.accessToken
) {
  const event = new CustomEvent("PassAccessToken", {
    detail: window.localStorage.accessToken,
  });

  window.dispatchEvent(event);
}
