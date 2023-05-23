## Componente Signup

El componente Signup está diseñado para permitir que los usuarios se registren en la aplicación. Contiene tres componentes internos que guían al usuario a través del proceso de registro.

## Upload Foto
El componente "Upload Foto" permite a los usuarios subir una foto de perfil. Tiene las siguientes características:

- Título: Un encabezado (<h1>) centrado que dice "Foto de Perfil".

- Icono de Aplicación: Un icono que, al hacer clic, activa un campo de entrada de tipo archivo (<input type="file">). El campo de entrada de archivo tiene su estilo de visualización configurado como "none" (display: none;), por lo que no es visible. Cuando se selecciona una foto, el icono se actualiza para mostrar la foto seleccionada.

- Botón "Siguiente": Un botón que, al hacer clic, lleva al siguiente componente ("Datos de Alumno") como un scroll horizontal.

## Datos de Alumno
El componente "Datos de Alumno" recopila información sobre el usuario registrado. Incluye:

- Título: Un encabezado (<h1>) centrado que dice "Datos de Alumno".

- Campos de Texto: Hay cinco campos centrados, cuatro de ellos son campos de texto (<input type="text">) para ingresar el nombre de usuario, correo electrónico, contraseña y configuración de contraseña. El quinto campo es una etiqueta <textarea> para la descripción.

- Etiquetas de Campo: Arriba de cada campo hay una etiqueta (<label>) que indica el nombre del campo correspondiente.

- Botón "Siguiente": Un botón que, al hacer clic, lleva al siguiente componente ("Datos de Mascota") como un scroll horizontal.

## Datos de Mascota
El componente "Datos de Mascota" solicita información sobre la mascota del usuario. Contiene los siguientes elementos:

- Título: Un encabezado (<h1>) centrado que dice "Datos de Mascota".

- Campos de Texto: Dos campos de texto (<input type="text">) para ingresar el nombre y fecha de nacimiento de la mascota.

- Etiquetas de Campo: Arriba de cada campo hay una etiqueta (<label>) que indica el nombre del campo correspondiente.

- Etiquetas de Selección: Dos etiquetas <select> para seleccionar el tipo y género de la mascota.

- Textarea: Un campo de descripción adicional para proporcionar información adicional sobre la mascota.

- Campos Checkbox: Dos campos de verificación (<input type="checkbox">) para aceptar la privacidad y la configuración de notificaciones, y la aceptación de los términos y condiciones.

- Botón "Empezar": Un botón que, al hacer clic, enviará los datos al servidor para su procesamiento. Si los datos se guardan correctamente, el usuario será redirigido a la página de inicio de sesión para iniciar sesión.

## ¡Listo! ## Con el componente Signup, los usuarios pueden registrarse en la aplicación proporcionando información personal y de mascotas.
