# MEGA DEVS - Full-Stack Production Container (Node.js 20 + OpenJDK 17)
FROM node:20-alpine

# Install OpenJDK 17 for javac / java execution in Cloud Juez Engine
RUN apk add --no-cache openjdk17-jdk bash

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH="${PATH}:${JAVA_HOME}/bin"

WORKDIR /app

# Copy package descriptors and install production dependencies
COPY package*.json ./
RUN npm install

# Copy application files and build Vite frontend bundle
COPY . .
RUN npm run build

EXPOSE 3001

ENV PORT=3001
ENV NODE_ENV=production

# Run unified server serving both API routes and static production bundle
CMD ["node", "server/index.js"]
