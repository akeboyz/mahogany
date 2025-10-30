# Digital Signage Package for Yodeck

This package contains all files needed to deploy the digital signage system on Yodeck platform.

## Files Structure

### Main Files
- `index.html` - Main signage player (entry point)
- `ann/` - All signage assets and content

### Key Directories
- `ann/data/` - JSON configuration and content files
- `ann/medias/` - Video and image assets
- `ann/music/` - Background music files
- `ann/data/playlist/` - Project-specific playlists

## Usage on Yodeck

1. Upload this entire package to Yodeck as a web content
2. Set the URL to point to `index.html`
3. For project-specific content, use URL parameters:
   - `?project_id=prj003` - Show content for project 003

## URL Parameters

- `project_id` - Specify which project's content to display (e.g., prj001, prj002, prj003, prj004)

## Key Features

- Auto-scaling responsive design (1080x1920 base resolution)
- Background music playlist
- Video content with CTA overlays
- Announcement system integration
- Touch-responsive interface

## Technical Notes

- Built for 9:16 aspect ratio (portrait orientation)
- Uses CSS transforms for auto-scaling to any screen size
- Includes fallback handling for media loading errors
- Supports both video and image content types

## Content Management

Content is controlled through JSON files in the `ann/data/` directory:
- `playlist.json` - Main playlist configuration
- `medias.json` - Media asset definitions
- `announce.json` - Announcement content
- `project.json` - Project information

## Deployment Date
Generated: 2025-09-21