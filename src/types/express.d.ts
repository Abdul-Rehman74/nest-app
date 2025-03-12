import { Request } from "express";
import { User } from "src/user/user.entity";

export interface AuthRequest extends Request {
  user: User; 
}
