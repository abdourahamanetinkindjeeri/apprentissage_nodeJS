export async function fetchJSON(endpoint) {
  const response = await fetch(`${process.env.URL_BD}${endpoint}`);
  if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
  return response.json();
}
