import { v4 as uuidv4 } from 'uuid';

export class UuidUtil {
    public static uuid4(): string{
        return uuidv4();
    }
}