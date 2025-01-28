import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permite usar o ConfigService globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_DATABASE', 'devlingo'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Carrega as entidades automaticamente
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true), // Apenas para desenvolvimento
        logging: configService.get<boolean>('DB_LOGGING', false),
        ssl: {
          rejectUnauthorized: false, 
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
