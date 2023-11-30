# Storage Partitioning bug in Chrome

ℹ️ This is not an issue in Firefox (version tested: 120)

## Detailed description

When storage partitioning is enabled in Chrome, even though in the diagram below
both `A` and `B` are in the same origin and are in the same top-level origin the
shared worker is not shared:

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│ http://foo.localhost:1234/                                          top-level: A  │
│                                                                                   │
│                                                                                   │
│                                                                                   │
│                                                                                   │
│                      ┌─────────────────────────────────────────────────────────┐  │
│                      │ http://bar.localhost:2345/                   iframe: B  │  │
│                      │                                                         │  │
│                      │                                                         │  │
│                      │                                                         │  │
│                      │                                                         │  │
│                      │                                                         │  │
│                      │              ┌───────────────────────────────────────┐  │  │
│                      │              │ http://foo.localhost:1234/iframe      │  │  │
│                      │              │                                       │  │  │
│                      │              │                                       │  │  │
│                      │              │                                       │  │  │
│                      │              │            ▲                          │  │  │
│                      │              │            │                iframe C  │  │  │
│                      │              └────────────┼──────────────────────────┘  │  │
│           ▲          │                           │                             │  │
│           │          └───────────────────────────┼─────────────────────────────┘  │
│           │                                      │                                │
└───────────┼──────────────────────────────────────┼────────────────────────────────┘
            │                                      │
            │                                      │
            │        ┌────────────┐                │
            │        │            │                │
            └────────┤   shared   ├────────────────┘
                     │            │
                     │   worker   │
                     │            │
                     └────────────┘
```

This issue is not present in Firefox.

## Setup

To start the example locally:

```bash
node ./index.js
```

Or with docker:

```
docker run --rm -it -v "$PWD:/app" -p 1234:1234 -p 2345:2345 --workdir /app node:18 ./index.js
```

Then visit http://foo.localhost:1234

If you are not on Linux, you might need to make changes such that `foo.localhost` and `bar.localhost` resolve to your loopback.

For instance you can modify your `/etc/hosts` on macOS to include the following entries:

```
foo.localhost   localhost
bar.localhost   localhost
```