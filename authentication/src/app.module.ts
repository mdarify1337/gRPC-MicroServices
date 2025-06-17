import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'postgres',
            port: parseInt('5432', 10),
            username: 'postgres',
            password: 'postgres',
            database: 'grpc_db',
            entities: [User],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
        UserModule
    ],
    controllers: [AppController, UserController],
    providers: [AppService, UserService],
})
export class AppModule { }
