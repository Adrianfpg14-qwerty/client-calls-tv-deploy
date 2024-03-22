import React, { useEffect, useRef } from 'react';

const ThumbnailCreator = () => {
  const canvasRef = useRef(null); // Referencia al canvas

  // useEffect(() => {
  //   const img = new Image();
  //   img.crossOrigin = 'anonymous'; // Necesario si la imagen es de otro origen (CORS)
  //   img.src = 'https://www.nobbot.com/wp-content/uploads/2023/07/Expandir-imagen-con-IA-01.jpg'
  //   img.onload = () => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext('2d');
  //     canvas.width = 100; // Define el tamaño deseado para tu thumbnail
  //     canvas.height = 100; // Define el tamaño deseado para tu thumbnail
  //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  //     // Convierte el canvas a un blob
  //     canvas.toBlob(blob => {
  //       console.log(blob); // Imprime el blob en la consola

  //       // Aquí puedes hacer lo que necesites con el blob,
  //       // por ejemplo, enviarlo a un servidor
  //     }, 'image/jpeg', 0.95); // Ajusta el tipo MIME y la calidad como necesites
  //   };
  // }, []);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Necesario para evitar problemas de CORS con imágenes de otros orígenes
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png';
    img.onload = () => {
      // Crea un canvas programáticamente
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 100; // Ajusta estas dimensiones según necesites
      canvas.height = 100; // Ajusta estas dimensiones según necesites

      // Dibuja la imagen en el canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convierte el canvas a blob
      canvas.toBlob(blob => {
        // El blob está listo para ser utilizado aquí
        console.log(blob);
        canvasRef.current = blob;

        // Por ejemplo, podrías enviar este blob a un servidor aquí
      }, 'image/jpeg', 0.95); // Ajusta el tipo MIME y la calidad según necesites
    };
  }, []);


  return (
    <div>
      {/* Canvas donde se dibujará la imagen. Se oculta si no quieres mostrarlo en la interfaz */}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ThumbnailCreator;
