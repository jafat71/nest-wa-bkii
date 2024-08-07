import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import admin from '../../firebase-admin'; // Ajusta el camino a tu configuración de Firebase

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      request.user = decodedToken; // Almacena la información del usuario decodificado en la solicitud
      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
