export function Languages() {
  this.language = "english";
  this.languages = {
    home:{
      english:"home",
    },
    write_a_comment: {
      english:"Write a comment",
    },
    contacts:{
      english:"Contacts",
    },
    all_storys:{
      english:"All Storys",
    },
    follow:{
      english:"Follow",
    },
    unfollow:{
      english:"Unfollow",
    },
    pending_follower: {
      english:"Pending Follower",
    },
    post:{
      english:"post"
    },
    selectPet:{
      english:"Select Pet"
    },
    description:{
      english:"Description",
    },
    language:{
      english:"Language",
    },
    select_a_country:{
      english:"Select a country",
    },
    male:{
      english:"Male",
    },
    female:{
      english:"Female",
    },
    name:{
      english:"Name",
    },
    lastName:{
      english:"Last Name",
    },
    birthDay:{
      english:"Birth Day",
    },
    address:{
      english:"Address",
    },
    country:{
      english:"Country",
    },
    postalCode:{
      english:"Postal Code",
    },
    female:{
      english:"Female",
    },
    email:{
      english:"Email",
    },
    phone:{
      english:"Phone",
    },
    password:{
      english:"Password",
    },
    password_confirmation:{
      english:"Password confirmation",
    },
    type:{
      english:"Type",
    },
    gender:{
      english:"Gender",
    },
    race:{
      english:"Race",
    },
    description:{
      english:"Description",
    },
    privacy_and_notification_settings: {
      english:"Privacy and notification settings",
    },
    acceptance_of_terms_and_conditions:{
      english:"Acceptance of terms and conditions",
    },
    userData:{
      english:"User Data",
    },
    petData:{
      english:"Pet Data",
    },
    next:{
      english:"Next",
    },
    missing_data_in_the_form:{
      english:"Missing data in the form",
    },
    passwords_do_not_match:{
      english:"Passwords do not match",
    },
    you_must_choose_a_profile_photo:{
      english:"You must choose a profile photo",
    },
    this_user_exists:{
      english:"this user exists",
    },
    select:{
      english:"Select",
    },
    lets_goo:{
      english:"Lets goo",
    },
    select_profile_image:{
      english:"Select profile image",
    },

    user_data:{
      english:"User Data"
    },
    pet_data:{
      english:"Pet Data"
    },
    followers:{
      english:"Followers",
    }


  }
}
Languages.prototype.setLanguage = function(language = "english") {
  this.language = language;
}
Languages.prototype.getWord = function(word = "home") {
  return this.languages[word][this.language];
}
