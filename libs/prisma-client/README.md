# prisma-client


The `src/generated` folder contains the Prisma client, generated from the schema located at the workspace root.

## Usage in Consumer Projects

To ensure your app has access to the Prisma client at runtime, set up a custom Nx target in your app to copy `src/generated` from this library to your app’s output `dist` folder.

You can refer to the `copy-generated` target configuration in the `api` app for an example.

Add the `copy-generated` target as a dependency for your app’s main targets (such as `serve` for a NestJS project). This way, the Prisma client files are always available when you run or build your app.
