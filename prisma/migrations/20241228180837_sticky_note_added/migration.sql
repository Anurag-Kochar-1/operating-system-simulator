-- CreateTable
CREATE TABLE "StickyNote" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT 'Hey there 👋 ',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL DEFAULT '#fff',
    "textColor" TEXT NOT NULL DEFAULT '#000',

    CONSTRAINT "StickyNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StickyNote" ADD CONSTRAINT "StickyNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
