import { Response } from 'express';
import { Get, Req, Res, Controller, UseGuards } from '@nestjs/common';
import { Roles } from "../decorator/role.decorator";
import { UserIdType } from './type';
import { UserService } from './user.service';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/role.guard'
import { Role } from '../utils/types'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.USER)
  @Get('/fetch-user')
  async getUser(@Req() req: UserIdType, @Res() res: Response) {
    const result = await this.userService.fetchUser(req.user.id);
    return res.status(result.statusCode).json(result);
  }
}
