import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { CreateMensajeDto } from './dto/create-mensaje-dto';

@Injectable()
export class MensajesService {
    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>
    ) { }

    async getAllMensajes(): Promise<Mensaje[]> {
        return await this.mensajeRepository.find();
    }

    async createMensaje(newMensaje: CreateMensajeDto): Promise<Mensaje> {
        const message = new Mensaje();
        message.mensaje = newMensaje.mensaje;
        message.nick = newMensaje.nick;
        return await this.mensajeRepository.save(message);
    }

    async updateMensaje(idMensaje: number, newMensaje: CreateMensajeDto): Promise<Mensaje> {
        const message = await this.mensajeRepository.findOne(idMensaje);
        message.nick = newMensaje.nick;
        message.mensaje = newMensaje.mensaje;
        return await this.mensajeRepository.save(message);
    }

    async deleteMensaje(idMensaje: number): Promise<any> {
        return await this.mensajeRepository.delete(idMensaje);
    }
}
