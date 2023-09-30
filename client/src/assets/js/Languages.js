export function Languages() {
  this.language = "español";
  this.languages = {

    username_or_password_does_not_exist: {
      english: "Username or password does not exist.",
      español: "Usuario o contraseña no existe."
    },
    password_must_be_between_8_and_20_characters_using_letters_and_numbers: {
      english: "Password must be between 8 and 20 characters, using letters and numbers.",
      español: "Contraseña debe ser entre 8 y 20 caracteres utilizando letras, números."
    },
    password_required: {
      english: "Password required",
      español: "Contraseña obligatoria"
    },
    enter_a_valid_email: {
      english: "Enter a valid email",
      español: "Introduzca un email válido"
    },
    required_field: {
      english: "Required field",
      español: "Campo requerido"
    },
    continue: {
      english: "Continue",
      español: "Continuar"
    },
    enter_an_email_address: {
      english: "Enter an email address:",
      español: "Ingrese un correo electrónico:"
    },
    enter_the_password: {
      english: "Enter the password:",
      español: "Ingrese la contraseña:"
    },
    w_petgram: {
      english: "WELLCOME TO PETGRAM",
      español: "BIENVENIDOS A PETGRAM",
    },
    login: {
      english: "LOGIN",
      español: "INICIAR SESiON"
    },
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
      español: "Raza"
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
      english: "Pending Followers",
      español: "Seguidores pendientes"
    },
    following: {
      english: "Following",
      español: "Seguidos"
    },
    pending_request:{
      english:"Pending request",
      español:"Solicitud Pendiente"
    },
    register:{
      english:"Register",
      español:"Registrar"
    },
     select_city:{
      english:"Select city",
      español:"Seleccionar ciudad"
    },
    update_pet:{
      english:"Update pet",
      español:"Actualizar mascota"
    },
    update_user:{
      english:"Update user",
      español: "Actualizar usuario"
    },
    add_pet:{
      english:"Add pet",
      español: "Agregar mascota"
    },
    delete_pet:{
      english:"Delete pet",
      español: "Eliminar mascota"
    },
    choose_delete:{
      english:"Choose to delete",
      español: "Selecciona para eliminar"
    },
    log_out:{
      english:"LogOut",
      español: "Cerrar sesion"
    },
    question:{
      english:"You are about to remove pet",
      español:"Estas por eliminar a la mascota"
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
