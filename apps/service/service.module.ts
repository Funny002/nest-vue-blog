import { AppSystem, JwtAuth, Service, Service_NAME } from "@app/config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "@app/common/jwtAuth";
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    // config
    ConfigModule.forRoot({ isGlobal: true, encoding: "utf-8", load: [Service, JwtAuth] })
    // module
  ],
  providers: [
    JwtService,
    ConfigService,
    { provide: APP_GUARD, useClass: JwtAuthGuard }
  ]
})
export class ServiceModule {
  static port: number;
  static version: string;

  constructor(private readonly configService: ConfigService) {
    // 获取配置
    const config = this.configService.get<AppSystem>(Service_NAME);
    // Api版本
    ServiceModule.version = config.version;
    // 服务端口
    ServiceModule.port = config.port;
  }
}
