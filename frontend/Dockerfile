# Etapa 1: Build do React
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Nginx para servir o build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta 80 (Nginx)
EXPOSE 80

# Copiar config de Nginx (opcional se quiser customizar)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
