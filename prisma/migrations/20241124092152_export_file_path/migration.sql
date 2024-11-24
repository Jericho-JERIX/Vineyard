/*
  Warnings:

  - You are about to drop the column `file` on the `ExportFile` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `ExportFile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExportFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "schedule" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ExportFile" ("createdAt", "id", "name", "schedule", "updatedAt") SELECT "createdAt", "id", "name", "schedule", "updatedAt" FROM "ExportFile";
DROP TABLE "ExportFile";
ALTER TABLE "new_ExportFile" RENAME TO "ExportFile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
