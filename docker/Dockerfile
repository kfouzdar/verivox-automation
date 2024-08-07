# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Playwright dependencies
RUN apt-get update && \
    apt-get install -y libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxkbcommon0 libpango-1.0-0 \
    libxshmfence1 libglu1-mesa libxi6 libxtst6 libxrandr2 libxcursor1 \
    libxinerama1 libxss1 && \
    rm -rf /var/lib/apt/lists/*

# Install Playwright
RUN npx playwright install --with-deps

# Copy the rest of the application code
COPY . .

# Run the application
CMD ["npx", "codeceptjs", "run", "--steps"]
