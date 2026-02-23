#!/bin/bash

# Create Bengali Health Tech Video for LifePulse
OUTPUT_DIR="/Users/shamim/Documents/Projects/Health BD/app/public/videos"
TEMP_DIR="/tmp/health_video_frames"
OUTPUT_FILE="$OUTPUT_DIR/hero-bengali.mp4"

# Clean up temp directory
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

echo "Creating Bengali Health Tech Video..."

# Scene 1: Introduction (0-3s) - Blue gradient background with main title
ffmpeg -y -f lavfi -i "color=c=#8ccfff:s=1280x720:d=3" \
    -vf "
    drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:
    text='LifePulse':
    fontcolor=white:fontsize=80:x=(w-text_w)/2:y=(h-text_h)/2-50:
    shadowcolor=black@0.5:shadowx=3:shadowy=3,
    drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:
    text='আপনার স্বাস্থ্য, আমাদর অঙ্গীকার':
    fontcolor=#242424:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2+50:
    shadowcolor=white@0.3:shadowx=2:shadowy=2,
    fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5
    " \
    -c:v libx264 -pix_fmt yuv420p -r 30 "$TEMP_DIR/scene1.mp4" 2>/dev/null

# Scene 2: Preventive Health Message (3-6s)
ffmpeg -y -f lavfi -i "color=c=#3e8cff:s=1280x720:d=3" \
    -vf "
    drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:
    text='প্রতিরোধমূলক স্বাস্থ্য পরীক্ষা':
    fontcolor=white:fontsize=56:x=(w-text_w)/2:y=(h-text_h)/2-40:
    shadowcolor=black@0.5:shadowx=3:shadowy=3,
    drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:
    text='100+ ল্যাব টেস্ট':
    fontcolor=#FDF8F0:fontsize=40:x=(w-text_w)/2:y=(h-text_h)/2+40:
    shadowcolor=black@0.3:shadowx=2:shadowy=2,
    fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5
    " \
    -c:v libx264 -pix_fmt yuv420p -r 30 "$TEMP_DIR/scene2.mp4" 2>/dev/null

# Scene 3: Early Detection (6-9s)
ffmpeg -y -f lavfi -i "color=c=#10B981:s=1280x720:d=3" \
    -vf "
    drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:
    text='1000+ রোগ সনাক্তকরণ':
    fontcolor=white:fontsize=56:x=(w-text_w)/2:y=(h-text_h)/2-40:
    shadowcolor=black@0.5:shadowx=3:shadowy=3,
    drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:
    text='প্রাথমিক পর্যায়ে':
    fontcolor=#FDF8F0:fontsize=40:x=(w-text_w)/2:y=(h-text_h)/2+40:
    shadowcolor=black@0.3:shadowx=2:shadowy=2,
    fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5
    " \
    -c:v libx264 -pix_fmt yuv420p -r 30 "$TEMP_DIR/scene3.mp4" 2>/dev/null

# Scene 4: Affordable Pricing (9-12s)
ffmpeg -y -f lavfi -i "color=c=#A8645A:s=1280x720:d=3" \
    -vf "
    drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:
    text='মাত্র ৳৮২ প্রতিদিন':
    fontcolor=white:fontsize=56:x=(w-text_w)/2:y=(h-text_h)/2-40:
    shadowcolor=black@0.5:shadowx=3:shadowy=3,
    drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:
    text='সারা বছরের স্বাস্থ্য নিশ্চয়তা':
    fontcolor=#FDF8F0:fontsize=36:x=(w-text_w)/2:y=(h-text_h)/2+40:
    shadowcolor=black@0.3:shadowx=2:shadowy=2,
    fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5
    " \
    -c:v libx264 -pix_fmt yuv420p -r 30 "$TEMP_DIR/scene4.mp4" 2>/dev/null

# Scene 5: CTA - Join Now (12-15s)
ffmpeg -y -f lavfi -i "color=c=#242424:s=1280x720:d=3" \
    -vf "
    drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:
    text='আজই যোগ দিন':
    fontcolor=#8ccfff:fontsize=64:x=(w-text_w)/2:y=(h-text_h)/2-30:
    shadowcolor=black@0.5:shadowx=3:shadowy=3,
    drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:
    text='LifePulse.com.bd':
    fontcolor=white:fontsize=36:x=(w-text_w)/2:y=(h-text_h)/2+60:
    shadowcolor=black@0.3:shadowx=2:shadowy=2,
    fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5
    " \
    -c:v libx264 -pix_fmt yuv420p -r 30 "$TEMP_DIR/scene5.mp4" 2>/dev/null

# Concatenate all scenes
echo "Concatenating scenes..."
ffmpeg -y -f concat -safe 0 -i <(for f in "$TEMP_DIR"/scene*.mp4; do echo "file '$f'"; done) \
    -c copy "$OUTPUT_FILE" 2>/dev/null

# Clean up
rm -rf "$TEMP_DIR"

echo "Video created: $OUTPUT_FILE"
ls -lh "$OUTPUT_FILE"
