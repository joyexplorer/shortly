CREATE TABLE "links" (
	"id" serial NOT NULL,
	"url" TEXT NOT NULL,
	"shortUrl" TEXT NOT NULL UNIQUE,
	"visitCount" bigint NOT NULL UNIQUE DEFAULT '0',
	"userId" int NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "links_pk" PRIMARY KEY ("id")
);

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"token" TEXT NOT NULL,
	"userid" INTEGER NOT NULL REFERENCES "users"("id")
);

ALTER TABLE "links" ADD CONSTRAINT "links_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");