import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { cpf: loginDto.cpf },
      include: {
        tenantUsers: {
          include: {
            tenant: true,
          },
        },
      },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.passwordHash))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const tenants = user.tenantUsers.map((tu) => ({
      id: tu.tenant.id,
      name: tu.tenant.name,
      role: tu.role,
    }));

    const payload = { sub: user.id, cpf: user.cpf, isRoot: user.isRoot };
    
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        isRoot: user.isRoot,
      },
      tenants,
    };
  }

  async selectTenant(userId: string, tenantId: string) {
    const tenantUser = await this.prisma.tenantUser.findUnique({
      where: {
        tenantId_userId: {
          tenantId,
          userId,
        },
      },
      include: {
        tenant: true,
      },
    });

    if (!tenantUser) {
      throw new UnauthorizedException('Acesso negado a este tenant');
    }

    const payload = { 
      sub: userId, 
      tenantId: tenantUser.tenantId, 
      role: tenantUser.role 
    };

    return {
      accessToken: this.jwtService.sign(payload),
      tenant: {
        id: tenantUser.tenant.id,
        name: tenantUser.tenant.name,
        role: tenantUser.role,
      },
    };
  }
}
