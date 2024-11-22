/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Medico } from '../Medico/medico.entity';
import { Diagnostico } from '../Diagnostico/diagnostico.entity';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  genero: string;

  @ManyToMany(() => Medico, (medico) => medico.pacientes)
  medicos: Medico[];

  @OneToMany(() => Diagnostico, (diagnostico) => diagnostico.paciente)
  diagnosticos: Diagnostico[]; // Asegúrate de que esta propiedad está correctamente configurada
}
