import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMealTable1681244891346 implements MigrationInterface {
  name = 'CreateMealTable1681244891346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "meals" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "image" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_e6f830ac9b463433b58ad6f1a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "meals" ADD CONSTRAINT "FK_3111c7cf13da976d7ed18287811" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meals" DROP CONSTRAINT "FK_3111c7cf13da976d7ed18287811"`,
    );
    await queryRunner.query(`DROP TABLE "meals"`);
  }
}
