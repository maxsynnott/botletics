FROM node:14 as builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY console.ts ./console.ts
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY src ./src
RUN npm ci && npm run build

FROM node:14
WORKDIR /app
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder /app/package*.json ./
# If prod it might be related to this commit and console.ts temp included in tsconfig
COPY --from=builder /app/build ./
RUN npm ci --only=production

CMD ["npm", "run", "start:production"]