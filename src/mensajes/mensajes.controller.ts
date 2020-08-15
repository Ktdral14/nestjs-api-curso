import { Controller, Get, Put, Body, Delete, Post, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';
import { response } from 'express';

@Controller('mensajes')
export class MensajesController {

    constructor(
        private readonly mensajeService: MensajesService
    ) { }

    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
        this.mensajeService.createMensaje(createMensajeDto)
            .then(mensaje => {
                response.status(HttpStatus.CREATED).json(mensaje);
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error al crear el mensaje' });
            });
    }

    @Get()
    getAll(@Res() response) {
        this.mensajeService.getAllMensajes()
            .then(mensajesList => {
                response.status(HttpStatus.OK).json(mensajesList);
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error al obtener los mensajes' });
            });
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje) {
        this.mensajeService.updateMensaje(idMensaje, updateMensajeDto)
            .then(mensaje => {
                response.status(HttpStatus.OK).json(mensaje);
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error al editar el mensaje' })
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje) {
        this.mensajeService.deleteMensaje(idMensaje)
            .then(mensaje => {
                response.status(HttpStatus.OK).json(mensaje);
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error al borrar el mensaje' })
            });
    }

}
