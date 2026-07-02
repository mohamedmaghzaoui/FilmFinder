-- CreateTable
CREATE TABLE "Series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "seasons" INTEGER NOT NULL,
    "episodes" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "episodes" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
