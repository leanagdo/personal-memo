// Password model based on the structure of github api at
import { Password } from '../models/password';

export interface PasswordResponse {
  lastUpdate: string;
  passwords : Array<Password>;

}
