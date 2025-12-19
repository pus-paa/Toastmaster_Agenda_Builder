-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "phoneNumber" VARCHAR(255),
    "role" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "clubId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "region" VARCHAR(255) NOT NULL,
    "district" VARCHAR(255) NOT NULL,
    "division" VARCHAR(255) NOT NULL,
    "area" VARCHAR(255) NOT NULL,
    "charteredDate" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("clubId")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "meetingNumber" INTEGER NOT NULL,
    "meetingTheme" VARCHAR(64) NOT NULL,
    "meetingDate" VARCHAR(64) NOT NULL,
    "startTime" VARCHAR(64) NOT NULL,
    "toastMasterOfDay" VARCHAR(64) NOT NULL,
    "clubId" INTEGER NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agenda" (
    "id" SERIAL NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "role" VARCHAR(64) NOT NULL,
    "assignedTo" VARCHAR(64) NOT NULL,
    "memberId" INTEGER,
    "memberDetail" VARCHAR(64),
    "allocatedTime" VARCHAR(64),
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "Agenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "emailAddress" VARCHAR(64) NOT NULL,
    "phoneNumber" VARCHAR(64) NOT NULL,
    "introduction" TEXT NOT NULL,
    "clubId" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_meetingNumber_key" ON "Meeting"("meetingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Member_emailAddress_key" ON "Member"("emailAddress");

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("clubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("clubId") ON DELETE RESTRICT ON UPDATE CASCADE;
