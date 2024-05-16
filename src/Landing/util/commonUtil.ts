export const downloadFile = (url) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(response => {
            const contents = new Blob([response], { type: 'text/plain' });
            // Create a temporary URL for the blob
            const blobUrl = URL.createObjectURL(contents);

            // Create a link element
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'download'; // Set the file name
            a.style.display = 'none';

            // Append the link to the body
            document.body.appendChild(a);

            // Programmatically trigger the download
            a.click();

            // Clean up
            URL.revokeObjectURL(blobUrl);
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
        });
}

export const viewFile = async (url: string): Promise<string | void> => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const contents = new Blob([blob], { type: 'text/plain' });
        const fileUrl = URL.createObjectURL(contents); // Changed variable name to fileUrl
        return fileUrl; // Return the URL string

    } catch (error) {
        console.error('Error downloading file:', error);
        return; // Return void on error
    }
};
