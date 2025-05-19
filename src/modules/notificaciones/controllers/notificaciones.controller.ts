import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { NotificacionesService } from '../services/notificaciones.service';
import { JwtAuthGuard } from '../../guards/auth.guard';

@Controller('notificaciones')
@UseGuards(JwtAuthGuard)
export class NotificacionesController {
  constructor(private readonly notiService: NotificacionesService) {}

  @Post('subscribe')
  async subscribe(@Body() sub: any, @Req() req: any) {
    const userId = (req as any).user.userId;
    await this.notiService.registrar(sub, userId);
  }
}
