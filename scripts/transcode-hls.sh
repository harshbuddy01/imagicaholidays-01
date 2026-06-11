#!/bin/bash
set -e

# Path configurations
SRC_VIDEO="public/videos/hero-1-compressed.mp4"
OUT_DIR="public/videos/hls/hero-1"

echo "Creating HLS output directory: $OUT_DIR"
mkdir -p "$OUT_DIR"

echo "Transcoding $SRC_VIDEO to HLS format..."
ffmpeg -y -i "$SRC_VIDEO" \
  -codec:v libx264 -profile:v main -preset medium -crf 22 \
  -g 100 -keyint_min 100 -sc_threshold 0 \
  -codec:a aac -b:a 128k \
  -hls_time 4 \
  -hls_playlist_type vod \
  -hls_segment_filename "$OUT_DIR/segment_%03d.ts" \
  "$OUT_DIR/playlist.m3u8"

echo "Transcoding complete! Created playlist.m3u8 and segment files."
