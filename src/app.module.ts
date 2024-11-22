/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './Entidades/Medico/medico.entity'; 
import { Paciente } from './Entidades/Pacientes/paciente.entity';
import { Diagnostico } from './Entidades/Diagnostico/diagnostico.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Epic@280701',
      database: 'postgres',
      entities: [Medico, Paciente, Diagnostico], // Asegúrate de que las entidades están todas aquí
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Medico, Paciente, Diagnostico]), // Asegúrate de que las entidades se cargan en el módulo
  ],
})
export class AppModule {}

