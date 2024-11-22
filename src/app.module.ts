/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoModule } from './Entidades/Medico/medico.module'; 
import { PacienteModule } from './Entidades/Pacientes/paciente.module';
import { DiagnosticoModule } from './Entidades/Diagnostico/diagnostico.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Epic@280701',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    MedicoModule,
    PacienteModule,
    DiagnosticoModule
  ],
})
export class AppModule {}

