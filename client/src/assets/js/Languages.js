export function Languages() {
  this.language = "español";
  this.languages = {
    home: {
      english: "home",
      español: "Inicio"
    },
    write_a_comment: {
      english: "Write a comment",
      español: "Escribir un comentario"
    },
    contacts: {
      english: "Contacts",
      español: "Contactos"
    },
    all_storys: {
      english: "All Storys",
      español: "Todas las historias"
    },
    follow: {
      english: "Follow",
      español: "Seguir"
    },
    unfollow: {
      english: "Unfollow",
      español: "Dejar de seguir"
    },
    pending_follower: {
      english: "Pending Follower",
      español: "Seguidores pendientes"
    },
    post: {
      english: "post",
      español: "Publicar"
    },
    selectPet: {
      english: "Select Pet",
      español: "Seleccionar mascota"
    },
    language: {
      english: "Language",
      español: "Lenguaje"
    },
    select_a_country: {
      english: "Select a country",
      español: "Seleccione una ciudad"
    },
    male: {
      english: "Male",
      español: "Macho"
    },
    female: {
      english: "Female",
      español: "Hembra"
    },
    name: {
      english: "Name",
      español: "Nombre"
    },
    lastName: {
      english: "Last Name",
      español: "Apellido"
    },
    birthDay: {
      english: "BirthDay",
      español: "Fecha de nacimiento"
    },
    city: {
      english: "City",
      español: "Ciudad"
    },
    address: {
      english: "Address",
      español: "Dirección"
    },
    country: {
      english: "Country",
      español: "País"
    },
    postalCode: {
      english: "Postal Code",
      español: "Código postal"
    },
    email: {
      english: "Email",
      español: "Correo electrónico"
    },
    phone: {
      english: "Phone",
      español: "Teléfono"
    },
    password: {
      english: "Password",
      español: "Contraseña"
    },
    password_confirmation: {
      english: "Password confirmation",
      español: "Confirmar contraseña"
    },
    type: {
      english: "Type",
      español: "Tipos"
    },
    gender: {
      english: "Gender",
      español: "Género"
    },
    race: {
      english: "Race",
      español: "Razas"
    },
    description: {
      english: "Description",
      español: "Descripción"
    },
    privacy_and_notification_settings: {
      english: "Privacy and notification settings",
      español: "Configuración de privacidad y notificaciones"
    },
    acceptance_of_terms_and_conditions: {
      english: "Acceptance of terms and conditions",
      español: "Aceptación de términos y condiciones"
    },
    userData: {
      english: "User Data",
      español: "Datos de usuario"
    },
    petData: {
      english: "Pet Data",
      español: "Datos de mascotas"
    },
    next: {
      english: "Next",
      español: "Siguiente"
    },
    missing_data_in_the_form: {
      english: "Missing data in the form",
      español: "Faltan datos en el formulario"
    },
    passwords_do_not_match: {
      english: "Passwords do not match",
      español: "Las contraseñas no coinciden"
    },
    you_must_choose_a_profile_photo: {
      english: "You must choose a profile photo",
      español: "Debes elegir una foto perfil"
    },
    this_user_exists: {
      english: "this user exists",
      español: "Este usuario ya existe"
    },
    select: {
      english: "Select",
      español: "Seleccionar"
    },
    lets_goo: {
      english: "Lets go",
      español: "Ir"
    },
    select_profile_image: {
      english: "Select profile image",
      español: "Seleccione una foto perfil"
    },
    user_data: {
      english: "User Data",
      español: "Datos de usuario"
    },
    pet_data: {
      english: "Pet Data",
      español: "Datos de mascota"
    },
    followers: {
      english: "Followers",
      español: "Seguidores"
    },
    pendingFollowers: {
      english: "PendingFollowers",
      español: "Seguidores pendientes"
    },
    following: {
      english: "Following",
      español: "Seguidos"
    }
  }
}
Languages.prototype.setLanguage = function (language = "español") {
  this.language = language;
}
Languages.prototype.getWord = function (word = "home") {
  if (!this.language) this.language = "español";
  const translate = this.languages[word][this.language];
  return translate || `[${word}]`;
}
