# Etapa 1: Build
FROM node:20 AS builder
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
RUN npm install

# Copiar todo o código-fonte
COPY . .

# Compilar o projeto NestJS (gera a pasta dist/)
RUN npm run build

# Etapa 2: Produção
FROM node:20 AS production
WORKDIR /app

# Copiar apenas os arquivos necessários para rodar a aplicação
COPY package*.json ./
RUN npm install --omit=dev

# Copiar a build gerada na etapa anterior
COPY --from=builder /app/dist ./dist

# Expor a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação Nest em modo produção
CMD ["npm", "run", "start:prod"]
