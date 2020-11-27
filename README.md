# My Snapp Chrome Extension

Getting your rides history from [Snapp application][snapppwa].

<img src="assests/Header.png" width="800">
<img src="assests/Info.png" width="800">

Note: you can see count and price of each bar chart on hover:

<img src="assests/Hours.png" width="800">

# What is Snapp?

You can think of [Iranian version of Uber][snappwiki]. Their public repository is available in [here][snapprepo].

# How the Extension Works?

1. After installing the extension you need to sign in into your Snapp account.
2. When you open [https://app.snapp.taxi][snapppwa] page a script injects into the HTML `body`.
3. The script read `access-token` from the page and create a new `CustomEvent` with `access-token` and dispatched by `window`.
4. In `contentscript` we listen to the upcoming event message from the injected script. After getting the message, we save `access-token` by using [chrome.storage][chromestorage] API.
5. Every time you click on MySnapp extension's icon we read `access-token` from `chrome.storage` and then set a state in the mounted React component (popup).
6. Now we have `access-token` as a state in our component. When you click on `Let's Go` button, the App is going request to Snapp API with your `access-token`
7. After your data received from Snapp API, we use `chrome.storage` for caching. And for the next time when you click on `Let's Go` button, we show your saved data.

# Privacy Policy

**All codes executed on the client-side** and the extension is only for **personal usage**. For analyzing the data we need to get your local `access-token` from the Snapp PWA. After signing in the token will be saved in chrome storage API. You can remove the extension to destroy your `accessToken` completely.

# How to use Mapbox?

You can get your interactive Heatmap of your rides.
Based on [Mapbox documentation][mapdoc]:

> Each Mapbox API has rate limits that cap the number of requests you can make against an endpoint.

So it's better that to get our own `access-token` from Mapbox. After register and confirm your email, you can copy your Mapbox `access-token` from [here][maptoken] and add paste it into the extension.

<img src="assests/MapboxToken.png" width="700">

# Contributing [WIP]

Pull requests are welcome. We can discuss what you would like to change.

# Installation [WIP]

Start: (use dist folder to install on Chrome)

```
cd my-snapp-extension
npm ci && cd src/popup && npm ci && cd ../..
npm start
```

Build: (my-snapp-extension.zip)

```
npm run tada
```

### Todo

- [ ] #feat update new rides manually/automatically (needs to store the last ride id)
- [ ] #feat porting **MySnapp** to Safari Web Extensions [issue [#1][#1]]
- [ ] #feat porting **MySnapp** to Firefox Add-ons (maybe we can use it on Android devices)

### In Progress

- [ ] add a **scroll to bottom** button to the pages

### Done

- [x] #bug car charts show duplicate data --- resolved in [!3][!3]

[mapdoc]: https://docs.mapbox.com/api/#rate-limits
[maptoken]: https://account.mapbox.com/access-tokens
[snapppwa]: https://app.snapp.taxi
[snappwiki]: https://en.wikipedia.org/wiki/Snapp!
[snapprepo]: https://github.com/snapp-cab
[chromestorage]: https://developer.chrome.com/extensions/storage
[#1]: https://github.com/sepehrity/my-snapp-extension/issues/1
[!3]: https://github.com/sepehrity/my-snapp-extension/pull/3