/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { Medico } from '../medico/medico.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>, // Inyectar el repositorio de Medico
  ) {}

  async create(paciente: Partial<Paciente>): Promise<Paciente> {
    if (!paciente.nombre || paciente.nombre.length < 3) {
      throw new Error('El nombre del paciente debe tener al menos 3 caracteres.');
    }
    const nuevoPaciente = this.pacienteRepository.create(paciente);
    return this.pacienteRepository.save(nuevoPaciente);
  }

  async findOne(id: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id },
      relations: ['medicos', 'diagnosticos'],
    });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');
    return paciente;
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find({ relations: ['medicos', 'diagnosticos'] });
  }

  async delete(id: string): Promise<void> {
    const paciente = await this.findOne(id);
    if (paciente.diagnosticos.length > 0) {
      throw new Error('No se puede eliminar un paciente con diagnósticos asociados.');
    }
    await this.pacienteRepository.delete(id);
  }

  // Nuevo método: addMedicoToPaciente
  async addMedicoToPaciente(pacienteId: string, medicoId: string): Promise<Paciente> {
    // Verificar si el paciente existe
    const paciente = await this.pacienteRepository.findOne({
      where: { id: pacienteId },
      relations: ['medicos'],
    });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');

    // Verificar si el médico existe
    const medico = await this.medicoRepository.findOne({ where: { id: medicoId } });
    if (!medico) throw new NotFoundException('Médico no encontrado');

    // Validar que el paciente no tenga más de 5 médicos asignados
    if (paciente.medicos.length >= 5) {
      throw new Error('Un paciente no puede tener más de 5 médicos asignados');
    }

    // Asignar el médico al paciente si no está ya asignado
    if (!paciente.medicos.find((m) => m.id === medicoId)) {
      paciente.medicos.push(medico);
      await this.pacienteRepository.save(paciente);
    }

    return paciente;
  }
}
