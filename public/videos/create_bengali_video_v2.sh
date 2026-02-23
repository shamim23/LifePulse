#!/bin/bash

# Create Bengali Health Tech Video for LifePulse (v2 with proper Bengali fonts)
OUTPUT_DIR="/Users/shamim/Documents/Projects/Health BD/app/public/videos"
TEMP_DIR="/tmp/health_video_frames"
OUTPUT_FILE="$OUTPUT_DIR/hero-bengali.mp4"

# Bengali font path
BENGALI_FONT="/System/Library/Fonts/KohinoorBangla.ttc"

# Clean up temp directory
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

echo "Creating Bengali Health Tech Video with proper fonts..."

# Scene 1: Introduction (0-3s) - Blue gradient background
ffmpeg -y -f lavfi -i "color=c=#8ccfff:s=1280x720:d=3" \
    -vf "
    drawtext=fontfile=$BENGALI_FONT:
    text='LifePulse':
    fontcolor=white:fontsize=90:x=(w-text_w)/2:y=(h-text_h)/2-70:
    shadowcolor=black@0.5:shadowx=4:shadowy=4:enable='between(t\\,0\\,3)',
    drawtext=fontfile=$BENGALI_FONT:
    text='আপনার স্বাস্থ্য, আমাদের অঙ্গীকার':
    fontcolor=#242424:fontsize=52:x=(w-text_w)/2:y=(h-text_h)/2+50:
    shadowcolor=white@0.5:shadowx=2:shadowy=2:enable='between(t\\,0\\,3)',
    fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5
    " \
    -c:v libx264 -pix_fmt yuv420p -r 30 "$TEMP_DIR/scene1.mp4"

# Scene 2: Preventive Health (3-6s)
ffmpeg -y -f lavfi -i "color=c=#3e8cff:s=1280x720:d=3" \
    -vf "
    drawtext=fontfile=$BENGALI_FONT:
    text='প্রতিরোধমূলক স্বাস্থ্য পরীক্ষা':
    fontcolor=white:fontsize=60:x=(w-text_w)/2:y=(h-text_h)/2-50:
    shadowcolor=black@0.6:shadowx=3:shadowy=3:enable='between(t\\,0\\,3)',
    drawtext=fontfile=$BENGALI_FONT:
    text='100+ ল্যাব টেস্ট':
    fontcolor=#FDF8F0:fontsize=44:x=(w-text_w)/2:y=(h-text_h)/2+50:
    shadowcolor=black@0.4:shadowx=2:shadowy=2:enable='between(t\\,0\\,3)',
    fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5
    " \
    -c:v libx264 -pix_fmt yuv420p -r 30 "$TEMP_DIR/scene2.mp4"

# Scene 3: Early Detection (6-9s)
ffmpeg -y -f lavfi -i "color=c=#10B981:s=1280x720:d=3" \
    -vf "
    drawtext=fontfile=$BENGALI_FONT:
    text='1000+ রোগ সনাক্তকরণ':
    fontcolor=white:fontsize=60:x=(w-text_w)/2:y=(h-text_h)/2-50:
    shadowcolor=black@0.6:shadowx=3:shadowy=3:enable='between(t\\,0\\,3)',
    drawtext=fontfile=$BENGALI_FONT:
    text='প্রাথমিক পর্যায়ে':
    fontcolor=#FDF8F0:fontsize=44:x=(w-text_w)/2:y=(h-text_h)/2+50:
    shadowcolor=black@0.4:shadowx=2:shadowy=2:enable='between(t\\,0\\,3)',
    fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5
    " \
    -c:v libx264 -pix_fmt yuv420p -r 30 "$TEMP_DIR/scene3.mp4"

# Scene 4: Affordable (9-12s)
ffmpeg -y -f lavfi -i "color=c=#A8645A:s=1280x720:d=3" \
    -vf "
    drawtext=fontfile=$BENGALI_FONT:
    text='মাত্র ৳৮২ প্রতিদিন':
    fontcolor=white:fontsize=64:x=(w-text_w)/2:y=(h-text_h)/2-50:
    shadowcolor=black@0.6:shadowx=3:shadowy=3:enable='between(t\\,0\\,3)',
    drawtext=fontfile=$BENGALI_FONT:
    text='সারা বছরের স্বাস্থ্য নিশ্চয়তা':
    fontcolor=#FDF8F0:fontsize=40:x=(w-text_w)/2:y=(h-text_h)/2+60:
    shadowcolor=black@0.4:shadowx=2:shadowy=2:enable='between(t\\,0\\,3)',
    fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5
    " \
    -c:v libx264 -pix_fmt yuv420p -r 30 "$TEMP_DIR/scene4.mp4"

# Scene 5: CTA (12-15s)
ffmpeg -y -f lavfi -i "color=c=#242424:s=1280x720:d=3" \
    -vf "
    drawtext=fontfile=$BENGALI_FONT:
    text='আজই যোগ দিন':
    fontcolor=#8ccfff:fontsize=72:x=(w-text_w)/2:y=(h-text_h)/2-40:
    shadowcolor=black@0.6:shadowx=4:shadowy=4:enable='between(t\\,0\\,3)',
    drawtext=fontfile=$BENGALI_FONT:
    text='LifePulse - বিস্তারিত জানুন':
    fontcolor=white:fontsize=38:x=(w-text_w)/2:y=(h-text_h)/2+70:
    shadowcolor=black@0.4:shadowx=2:shadowy=2:enable='between(t\\,0\\,3)',
    fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5
    " \
    -c:v libx264 -pix_fmt yuv420p -r 30 "$TEMP_DIR/scene5.mp4"

# Concatenate all scenes
echo "Concatenating scenes..."
ffmpeg -y -f concat -safe 0 -i <(for f in "$TEMP_DIR"/scene*.mp4; do echo "file '$f'"; done) \
    -c copy "$OUTPUT_FILE"

# Clean up
rm -rf "$TEMP_DIR"

echo "Video created successfully!"
ls -lh "$OUTPUT_FILE"
