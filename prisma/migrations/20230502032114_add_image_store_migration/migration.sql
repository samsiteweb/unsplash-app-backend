-- CreateTable
CREATE TABLE "image_store" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_store_pkey" PRIMARY KEY ("id")
);
