import { ConnectionOptions } from 'typeorm';
const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'nestj',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  synchronize: true,

  // migrationsRun: true,
  // logging: true,
  // logger: 'file',

  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
console.log(__dirname + '/**/*.entity{.ts,.js}');
export = config;
