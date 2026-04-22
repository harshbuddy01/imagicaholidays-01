// Pixabay search for hotlinkable video
const query = "iceland mountain snow";
const key = "47348245-2cb5a1a7959e56c96a5d8e0b6"; 
try {
  const res = await fetch(`https://pixabay.com/api/videos/?key=${key}&q=${encodeURIComponent(query)}&per_page=3`);
  const data = await res.json();
  if (data.hits && data.hits.length > 0) {
    console.log("Found Pixabay Video:", data.hits[0].videos.large.url);
  } else {
    console.log("No Pixabay results");
  }
} catch(e) {
  console.log("Error:", e.message);
}
