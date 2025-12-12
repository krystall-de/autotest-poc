# Stage 1: Install dependencies and build the app
FROM node:22-alpine AS builder

WORKDIR /workspace

# Enable yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Copy workspace files, shared libs (prisma, libs) and apps
# Note: Full workspace is needed for Nx to resolve project references
COPY package.json yarn.lock .yarnrc.yml nx.json tsconfig.base.json tsconfig.json ./
COPY eslint.config.mjs vitest.workspace.ts ./
COPY prisma ./prisma
COPY libs ./libs
COPY apps ./apps

# Install dependencies
RUN yarn install --immutable

# Build the app
ENV NX_DAEMON=false
RUN yarn nx build @autotest-poc/api --configuration=production
# Prune lockfile and copy workspace modules
RUN yarn nx run @autotest-poc/api:prune

# Stage 2: Runtime image
FROM node:22-alpine

ENV API_HOST=0.0.0.0

WORKDIR /app

# Enable yarn (optional, for runtime scripts)
RUN corepack enable && corepack prepare yarn@stable --activate

# Copy everything from dist of the target app (includes built output, pruned package.json/yarn.lock, workspace_modules)
COPY --from=builder /workspace/apps/api/dist/ ./

RUN yarn install --immutable --mode=skip-build

CMD ["node", "main.js"]