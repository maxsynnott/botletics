FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY index.ts ./
# prisma folder is copied here in github actions job
COPY prisma ./prisma
RUN npm ci && npm run build

FROM public.ecr.aws/lambda/nodejs:14
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./
RUN npm ci --only=production
CMD ["index.handler"]
