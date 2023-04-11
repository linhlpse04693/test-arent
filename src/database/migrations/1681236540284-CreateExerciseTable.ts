import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExerciseTable1681236540284 implements MigrationInterface {
  name = 'CreateExerciseTable1681236540284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "exercises" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "energy" double precision NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "diaries" DROP COLUMN "deletedAt"`);
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_6e37f37f422796d689a7b3952cf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "FK_6e37f37f422796d689a7b3952cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "diaries" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(`DROP TABLE "exercises"`);
  }
}
