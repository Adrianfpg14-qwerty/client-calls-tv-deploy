import React, { useEffect, useState } from 'react';

const ThumbnailForVideos = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    const video = document.createElement('video');
    video.src = 'https://firebasestorage.googleapis.com/v0/b/uploadvideos-5bd09.appspot.com/o/archivos%2F8ce03a53-e238-49e8-b2bb-2a66dd4b9811?alt=media&token=d362a9bd-fff4-4241-8d6d-ce89fcd3e0af'; // Reemplaza esto con la URL de tu video
    video.addEventListener('canplaythrough', () => { // Espera hasta que el video pueda reproducirse completamente
      video.currentTime = 30; // Establece el tiempo al frame deseado
    });
    video.addEventListener('seeked', () => { // Este evento se dispara cuando el video ha buscado la posición de currentTime
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        setThumbnailUrl(url);
      }, 'image/jpeg', 0.95);
    });

    // document.body.appendChild(video); // Añade el video al cuerpo del documento para asegurar la carga (puedes ocultarlo con CSS si es necesario)
    // video.load(); // Carga el video
  }, []);

  return (
    <div>
      <h4>Thumbnail del Video</h4>
      {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail del video" />}
    </div>
  );
};

export default ThumbnailForVideos;
