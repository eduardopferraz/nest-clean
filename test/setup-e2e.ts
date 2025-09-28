import 'dotenv/config'
import { PrismaClient } from '../generated/prisma'
import { randomUUID } from 'crypto'
import { execSync } from 'child_process'

let prisma: PrismaClient
let schemaId: string

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

beforeEach(async () => {
  schemaId = randomUUID()

  const databaseUrl = generateUniqueDatabaseURL(schemaId)
  process.env.DATABASE_URL = databaseUrl

  prisma = new PrismaClient()

  execSync('pnpm prisma migrate deploy')

  return process.env.DATABASE_URL
})

afterEach(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
