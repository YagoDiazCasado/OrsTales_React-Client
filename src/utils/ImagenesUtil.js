

export const ImagenesUtil = {
  async getImagen(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return await blob.arrayBuffer();
    } catch (error) {
      console.error("Error cargando imagen:", error);
      return null;
    }
  },

  async fileToByte(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  },

  async convertImageToBytes(imgElement) {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgElement, 0, 0);
        canvas.toBlob(blob => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsArrayBuffer(blob);
        }, 'image/png');
      } catch (e) {
        reject(e);
      }
    });
  },

  byteArrayToUrl(byteArray) {
    const blob = new Blob([byteArray], { type: 'image/png' });
    return URL.createObjectURL(blob);
  },

  async randomImagePick() {
    // Supone que tienes un array de imágenes precargadas (nombre o rutas relativas)
    const rutas = [
      '/images/profiles/img1.png',
      '/images/profiles/img2.png',
      '/images/profiles/img3.png'
      // Añade más rutas según tus imágenes
    ];
    const idx = Math.floor(Math.random() * rutas.length);
    const res = await fetch(rutas[idx]);
    return await res.blob();
  }
};
