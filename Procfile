web: npx prisma migrate deploy --schema ./src/db/prisma/schema.prisma && yarn start | tee >(split -d -b 100000 -)
