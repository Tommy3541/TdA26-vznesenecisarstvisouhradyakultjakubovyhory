FROM node:20-alpine AS base


FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
RUN npm i


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 sveltekit

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER sveltekit

EXPOSE 3001

ENV PORT=3001
ENV HOST="0.0.0.0"

CMD ["node", "build"]

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
