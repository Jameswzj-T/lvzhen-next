# Same supported Node major as the locally verified build. Docker execution is a separate check.
FROM node:22.23.1-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@11.23.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN node node_modules/next/dist/bin/next build --webpack

FROM node:22.23.1-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000 LVZHEN_ENV=public
RUN addgroup -S lvzhen && adduser -S lvzhen -G lvzhen
COPY --from=build --chown=lvzhen:lvzhen /app/.next/standalone ./
COPY --from=build --chown=lvzhen:lvzhen /app/.next/static ./.next/static
USER lvzhen
EXPOSE 3000
CMD ["node", "server.js"]
