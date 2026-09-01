# Simple static file server
FROM node:20-slim

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy site files
COPY . .

# Serve on port 3000 (Railway will provide PORT)
ENV PORT=3000
EXPOSE 3000

CMD ["serve", "-s", "-l", "3000"]
