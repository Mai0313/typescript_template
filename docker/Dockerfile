FROM node:22-alpine AS base
WORKDIR /app

LABEL maintainer="Wei Lee <mai@mai0313.com>" \
    org.label-schema.name="ts_template" \
    org.label-schema.vendor="Wei Lee" \
    org.label-schema.schema-version="1.0" \
    com.centurylinklabs.watchtower.stop-signal="SIGINT"

########################################################################################

FROM base AS deps
# Install dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

########################################################################################

FROM base AS builder
# Build the application
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

########################################################################################

FROM base AS runtime
# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Add non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expose port if needed
# EXPOSE 3000

# Default command
CMD ["node", "dist/cli.js"]

########################################################################################

FROM runtime AS prod
# Production stage (for backwards compatibility)
