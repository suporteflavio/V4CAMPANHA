import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PrismaModule, AuthModule, HealthModule, UsersModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Middleware to inject tenant context into RLS for every request with tenantId
    consumer
      .apply(async (req, res, next) => {
        const prisma = req.app.get(PrismaService);
        const tenantId = req.user?.tenantId;
        if (tenantId) {
          await prisma.setTenantContext(tenantId);
        }
        next();
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
