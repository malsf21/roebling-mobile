# roebling (the mobile version)

Hey there! This is intended to be the mobile companion to [roebling](https://github.com/malsf21/roebling-web), a dumb (i.e. not smart) home assistant with some "useful" features. It's also an excuse for me to really get into React Native before Teach LA forms our curriculum content around the course!

Fow now, this entire app is very WIP. Docs, feature lists, and more coming soon!

## Development Setup

To start developing, we'll follow our typical Node project workflow. You'll need a copy of [Node.js](https://nodejs.org/en/) on your computer; this was developed with the LTS version, `12.18`.

First, let's grab our repository with `git`:

```sh
$ git clone https://github.com/malsf21/roebling-mobile.git
...
$ cd roebling-mobile
```

Then, we'll install and run our app, which uses the expo client. We recommend using [`yarn`](https://yarnpkg.com/), like so:

```sh
$ yarn
$ yarn start]
...
```

At this point, you'll be prompted with several options to run the app. It's probably the easiest to run it in the web for now with the `w` option, but you can choose whatever you'd prefer.