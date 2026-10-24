import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Identidad de release capturada estrictamente al arrancar el proceso Node / evaluar el módulo.
// Reside en memoria como constante inmutable durante toda la vida del proceso;
// NO se relee de disco por petición para garantizar que refleja la versión efectivamente cargada.
function captureBootReleaseIdentity(): string {
  if (process.env.RELEASE_ID && process.env.RELEASE_ID.trim().length > 0) {
    return process.env.RELEASE_ID.trim();
  }
  if (process.env.BUILD_ID && process.env.BUILD_ID.trim().length > 0) {
    return process.env.BUILD_ID.trim();
  }
  try {
    const buildIdFile = path.join(process.cwd(), '.next', 'BUILD_ID');
    if (fs.existsSync(buildIdFile)) {
      return fs.readFileSync(buildIdFile, 'utf8').trim();
    }
  } catch {
    // Intencional: si el archivo no existe o no es legible en arranque
  }
  return 'unknown';
}

const BOOT_RELEASE_ID: string = captureBootReleaseIdentity();
const BOOT_TIMESTAMP: string = new Date().toISOString();

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      release_id: BOOT_RELEASE_ID,
      boot_timestamp: BOOT_TIMESTAMP,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    }
  );
}
