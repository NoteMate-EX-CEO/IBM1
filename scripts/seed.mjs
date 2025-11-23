async function main() {
  const url = process.env.SEED_URL || 'http://localhost:3000/api/dev/seed';
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Seed failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  console.log('Seed result:', data);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
