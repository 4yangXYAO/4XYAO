export function GET() {
  return Response.json({
    ok: true,
    service: 'portfolio-api',
    timestamp: new Date().toISOString(),
  });
}