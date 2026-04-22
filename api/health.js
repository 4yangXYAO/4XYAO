export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: "portfolio-api",
    timestamp: new Date().toISOString(),
  });
}
