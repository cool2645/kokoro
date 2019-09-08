# 💓 kokoro.js

[![Version](https://flat.badgen.net/npm/v/kokoro)](https://npmjs.com/package/kokoro)
[![Gzipped Bundle Size](https://flat.badgen.net/bundlephobia/minzip/kokoro)](https://bundlephobia.com/result?p=kokoro)
[![Build Status](https://flat.badgen.net/travis/cool2645/kokoro)](https://travis-ci.org/cool2645/kokoro)
[![Coverage](https://flat.badgen.net/coveralls/c/github/cool2645/kokoro)](https://coveralls.io/github/cool2645/kokoro)
[![JavaScript Style Guide](https://flat.badgen.net/badge/code%20style/standard/green)](https://standardjs.com)
[![Gitmoji](https://flat.badgen.net/badge/gitmoji/%F0%9F%98%9C%20%F0%9F%98%8D/FFDD67)](https://gitmoji.carloscuesta.me)

Kokoro is a super light-weighted, headless javascript music player,
which provides observable states and programmatic control apis, based on [redux](https://redux.js.org).

## 📝 Documentation

Visit it [here](https://kokoro.js.org).

## 🚀 Quick Start

1. Open console.
2. Copy and paste the following code snippet.
    ```javascript
    let script = document.createElement('script')
    script.src = 'https://unpkg.com/kokoro'
    document.body.appendChild(script)
    window.player = new Kokoro()
    ```
3. You're ready to go now! Look up to kokoro's [API doc](https://kokoro.js.org/classes/kokoro.html)
and try to play a song.

## 💡 FAQ

**Q: Why do I need kokoro?**

Those most popular web music players (e.g. [APlayer](https://aplayer.js.org), [bPlayer](http://bplayer.js.org/))
have their states binding to document elements,
which means that when the UI re-renders 
(probably caused by a router navigation),
the player completely loses its state, making the playing songs abort
and requires a re-initialization of the player.

This pain is not necessary!
Your users won't suffer from the abortion of their loving music while
navigating to next article any more.
With the use of kokoro, you player's state will be always consistent,
no matter how many UI components, by what library, when and where are those components rendered.

**Q: But how could I use without a UI?**

We provide an UI library that works with kokoro seamlessly,
check it out [here](https://github.com/cool2645/kokoro-player).

Note that it's not necessary to use kokoro with [kokoro-player](https://github.com/cool2645/kokoro-player),
you can use whatever UI you want, or you can just simply use kokoro in a programmatic way.

**Q: All of those UI in existence suck, can I carve my own UI?**

Sure. Check out kokoro's [API documentation](https://kokoro.js.org), you'll find it super easy.
If you're familiar with [redux](https://redux.js.org), it'll be more than easy.

You're welcomed to share your own UI, your link can be added to this README.
Feel free to file an issue or make a pull request.
