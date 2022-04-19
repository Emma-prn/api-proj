export async function getQuotes() {
  const request = await fetch('https://api.quotable.io/quotes?limit=150');
  const data = await request.json();
  return data;
}

export async function getAuthors() {
  const request = await fetch('https://api.quotable.io/authors?limit=150');
  const data = await request.json();
  return data;
}

export async function getTags() {
  const request = await fetch('https://api.quotable.io/tags');
  const data = await request.json();
  const result = data.filter(obj => {
    return obj.quoteCount > 100;
  });
  return result;
}