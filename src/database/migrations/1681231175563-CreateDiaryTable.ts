import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDiaryTable1681231175563 implements MigrationInterface {
  name = 'CreateDiaryTable1681231175563';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "diaries" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_ffd738e7d40dcfa59283dcaae87" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "diaries" ADD CONSTRAINT "FK_6454969d8c037fee60374c8527c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "diaries" DROP CONSTRAINT "FK_6454969d8c037fee60374c8527c"`,
    );
    await queryRunner.query(`DROP TABLE "diaries"`);
  }
}
