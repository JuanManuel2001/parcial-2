/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './Entidades/Medico/medico.entity'; 
import { Paciente } from './Entidades/Pacientes/paciente.entity';
import { Diagnostico } from './Entidades/diagnostico/diagnostico.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Epic@280701',
      database: 'parcial2v',
      entities: [Medico, Paciente, Diagnostico], 
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Medico, Paciente, Diagnostico]), 
  ],
})
export class AppModule {}
