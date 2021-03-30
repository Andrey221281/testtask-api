import {MigrationInterface, QueryRunner} from "typeorm";

export class addAxiosAndLead1617093339607 implements MigrationInterface {
    name = 'addAxiosAndLead1617093339607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "axios" ("id" SERIAL NOT NULL, "token_type" character varying NOT NULL, "expires_in" integer NOT NULL, "access_token" character varying NOT NULL, "refresh_token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_770c49a493ed01baa85373a1691" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lead" ("id" integer NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "contactsId" integer NOT NULL, "pipelineId" integer NOT NULL, "userId" integer NOT NULL, "tags" json, "created_at" integer NOT NULL, CONSTRAINT "PK_ca96c1888f7dcfccab72b72fffa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lead"`);
        await queryRunner.query(`DROP TABLE "axios"`);
    }

}
