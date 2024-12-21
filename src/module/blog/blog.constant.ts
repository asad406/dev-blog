import config from "../../config"
import { JwtPayload } from "jsonwebtoken"
import jwt from "jsonwebtoken"

const getUserIdFromToken = (token: string): string | null => {
    try {
        const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload     
        return decoded.userId ;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};
export default getUserIdFromToken;