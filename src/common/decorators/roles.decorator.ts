import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../types';

export const Roles = (roles: RolesEnum[]) => SetMetadata('roles', roles);
