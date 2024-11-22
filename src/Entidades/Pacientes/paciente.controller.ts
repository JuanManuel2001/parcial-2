/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { Paciente } from './paciente.entity';

@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  create(@Body() paciente: Partial<Paciente>): Promise<Paciente> {
    return this.pacienteService.create(paciente);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Paciente> {
    return this.pacienteService.findOne(id);
  }

  @Get()
  findAll(): Promise<Paciente[]> {
    return this.pacienteService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.pacienteService.delete(id);
  }

  @Post(':pacienteId/medicos/:medicoId')
  addMedicoToPaciente(
    @Param('pacienteId') pacienteId: string,
    @Param('medicoId') medicoId: string,
  ): Promise<Paciente> {
    return this.pacienteService.addMedicoToPaciente(pacienteId, medicoId);
  }
}
