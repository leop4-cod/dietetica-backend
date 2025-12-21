import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthLogDocument = HydratedDocument<AuthLog>;

@Schema({ collection: 'auth_logs' })
export class AuthLog {
    @Prop({ required: true })
    userId: string; 

    @Prop({ required: true })
    accion: string; 

    @Prop({ default: Date.now })
    fecha: Date;
}

export const AuthLogSchema = SchemaFactory.createForClass(AuthLog);
