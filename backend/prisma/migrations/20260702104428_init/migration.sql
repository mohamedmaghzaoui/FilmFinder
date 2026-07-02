-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "description" TEXT NOT NULL
);
