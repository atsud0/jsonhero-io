## Deploying to Cloudflare

This repository still uses Wrangler 2.x in `package.json`, so the deploy command
should go through `wrangler publish` (or the packaged `npm run deploy` script),
not `wrangler deploy`.

### Install and login to wrangler
```bash
npm install -g wrangler
wrangler login
```

### Create service
Go to workers tab from your [cloudflare profile](https://dash.cloudflare.com/profile) and create a new worker. Use HTTP Handler as service type. The name of worker must match the `name` field in `wrangler.toml`.

### Setup wrangler.toml
Edit the following variables in `wrangler.toml` and `wrangler.toml.dev`:
- `account_id`: Get account id by using
    ```bash
    wrangler whoami
    ```
- `kv_namespaces`: Run the following comands to create a new KV namespace.
    ```bash
    wrangler kv:namespace create DOCUMENTS # gives namespace id
    wrangler kv:namespace create DOCUMENTS --preview # gives preview id for namespace
    ```
    Replace current entry for `kv_namespaces` as:
    ```toml
    kv_namespaces = [
    { binding = "DOCUMENTS", id = <YOUR_ID>, preview_id = <YOUR_PREVIEW_ID> }
    ]
    ```

### Configure Environment Variables
Set `SESSION_SECRET` environment for worker.
```bash
wrangler secret put SESSION_SECRET
```
Optionally set other secrets listed at the end of `wrangler.toml`.

### Publish worker
```bash
npm run deploy
```

For production route deployment, use:

```bash
npm run deploy:production
```

If you are deploying from the Cloudflare dashboard, set the deploy command to
`npm run deploy:cloudflare` or `npm run deploy:cloudflare:production`.
