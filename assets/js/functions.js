export function downloadSVG(filename = 'qrcode.svg') {
    const svgContainer = document.getElementById('svg-container');
    if (!svgContainer) {
        console.error('SVG container not found');
        return;
    }

    // Get the actual SVG element, not the container's innerHTML
    const svgElement = svgContainer.querySelector('svg');
    if (!svgElement) {
        console.error('No SVG element found in container');
        return;
    }

    // Serialize just the SVG element
    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svgElement);

    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}