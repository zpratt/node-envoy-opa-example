# node-envoy-opa-example

## Testing Locally

Ensure [gprcui](https://github.com/fullstorydev/grpcui) is installed.

### Start the server

```bash
nvm use
node index.js
```

### Test the server

```bash
grpcui -plaintext -proto src/proto/health.proto localhost:50051
```
